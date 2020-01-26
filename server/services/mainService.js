const bonjour = require('bonjour')();
const uuidv1 = require('uuid/v1');
const getPort = require('get-port');
const diskdb = require('diskdb');
const {sign, verify} = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

// this is the main interface to the actual front end
const theKey = "this is a very secret key";
const FRONT_SOCKET_PORT = 5000;
const PLAYER_SOCKET_PORT = 5001;
const frontSocketServer = require('http').createServer();
const playerSocketServer = require('http').createServer();
const frontIO = require('socket.io')(frontSocketServer, {});
const playerIO = require('socket.io')(playerSocketServer, {});

// Modify these values
const appName = 'server';
const serviceName = 'main';

// start the database
const db = diskdb.connect(`./db/`, ['songs', 'parties']);

app.disable('etag');
app.use(express.json());
// this url will list all the routes
app.get('/api', function (req, res) {
    let r = app._router.stack
        .filter(e => e.route)
        .map(e => ({
            route: e.route.path,
            method: Object.keys(e.route.methods)
        }))
        .filter(e => {
            // hide the default routes
            return e.route !== '/api' && e.route !== '/heartbeat' && e.route !== '*'
        });
    // need to add a way to compress the routes
    return res.json(r);
});
app.get('/heartbeat', function (req, res) {
    return res.send("alive");
});

/**
 *
 * Custom logic below here
 *
 */

let currentEventLoopParties = [];

class Main {
    constructor() {
    }

    // playback is playing if playing or paused, idle if its neither of these states
    startPartyEventLoop() {
        let allParties = db['parties'].find();
        allParties.forEach((globParty) => {
            if (currentEventLoopParties[globParty.id] === undefined) {
                console.log(`[MUSIC] Starting party ${globParty.id}`);
                currentEventLoopParties[globParty.id] = setInterval(async () => {
                    if (playerOutgoingSocket.length > 0) {
                        let message = getMessageFromQueue();
                        console.log(message);
                        playerIO.to(message.partyId).emit(message.event, message.data);
                    }

                    if (frontOutgoingSocket.length > 0) {
                        let message = getMessageFromFrontQueue();
                        frontIO.to(message.partyId).emit(message.event, message.data);
                    }

                    try {
                        let party = db['parties'].findOne({id: globParty.id});
                        addMessageToFrontQueue(new Message(globParty.id, 'update', party));
                        switch (party.state) {
                            case 0: // currently playing
                                if ((party.oldStatus === 0 || party.oldStatus === 1) && party.status === 1) {
                                    updatePartyState(party.id, 1);
                                }
                                break;
                            case 1: // currently idle
                                if (party.playlist.length > 0) {
                                    updatePartyState(party.id, 2);
                                }
                                break;
                            case 2: // playing next song
                                console.log('playing next song state');
                                let song = party.playlist.shift();
                                console.log({song});
                                if (song) {
                                    db['parties'].update({
                                        id: party.id
                                    }, {
                                        playlist: party.playlist
                                    });
                                    console.log('emit the play event');
                                    db['parties'].update({
                                        id: party.id
                                    }, {
                                        currentlyPlaying: song
                                    });
                                    addMessageToQueue(new Message(party.id, 'play', {
                                        path: song.songUrl,
                                        mode: 'name'
                                    }));
                                    updatePartyState(party.id, 0);
                                } else {
                                    updatePartyState(party.id, 1);
                                }
                                break;
                        }
                        updatePartyOldState(party.id);
                    } catch (e) {
                        console.error(`Error in the main party thread with party: ${globParty.id}`);
                        console.log(e);
                    }
                }, 500);
            }
        });
    }
}

let main = new Main();
main.startPartyEventLoop(); // to be called on each party create

// Simplified type def
class Message {
    constructor(partyId, event, data) {
        this.partyId = partyId;
        this.event = event;
        this.data = data;
    }
}

let playerOutgoingSocket = []; // Array of messages

const addMessageToQueue = (message) => {
    playerOutgoingSocket.push(message);
};

const getMessageFromQueue = () => {
    return playerOutgoingSocket.shift();
};

let frontOutgoingSocket = []; // Array of messages

const addMessageToFrontQueue = (message) => {
    frontOutgoingSocket.push(message);
};

const getMessageFromFrontQueue = () => {
    return frontOutgoingSocket.shift();
};

frontIO.on('connection', (socket) => {
    console.log(socket.id, `connected FRONT socket`);
    socket.on('join-room', (data) => {
        let id = db['parties'].findOne({code: data.partyCode}).id;
        socket.join(id);
    });

    socket.on('disconnect', () => {
        console.log(socket.id, `disconnected FRONT socket`);
    });

    socket.on('search', () => {
        socket.emit('search-result', db['songs'].find());
    });

    socket.on('play', (data) => {
        console.log(data);
        let p = db['parties'].findOne({id: data.partyId});
        updatePartyState(p.id, 2);
    });

    socket.on('pause', (data) => {
        console.log(data);
        let p = db['parties'].findOne({id: data.partyId});
        pauseSong(p.id);
    });

    socket.on('add-song', (data) => {
        console.log(data);
        let p = db['parties'].findOne({
            code: data.partyCode
        });

        p.playlist.push(data.song);

        db['parties'].update({
            code: data.partyCode
        }, {
            playlist: p.playlist
        });
    });
});

playerIO.on('connection', (socket) => {
    console.log(socket.id, `connected PLAYER socket`);
    socket.on('join-room', (data) => {
        socket.join(data);
        console.log(data);
    });
    socket.on('disconnect', () => {
        console.log(socket.id, `disconnected PLAYER socket`);
    });
    // other socket logic here
    socket.on('got-status', (data) => {
        if (data.id) {
            updatePartyOldStatus(data.id);
            updatePartyStatus(data.id, convertStatus(data.status));
        }
    });
});

const convertStatus = (txt) => {
    if (txt === "Idle") {
        return 1;
    }
    return 0;
};

// SONGS

app.get('/songs/get', function (req, res) {
    return res.json({
        "songs": db['songs'].find()
    });
});

app.post('/songs/search', function (req, res) {
    console.log(req.body.query); // search query, then filter the songs
    return res.json({
        "songs": db['songs'].find()
    });
});

// PLAYER

app.get('/player/play', function (req, res) {
    // just start playing the music
    return res.json({
        "res": db['songs'].find()
    });
});

app.post('/player/play', function (req, res) {
    // post some stuff to the server to deal with
    playSong(req.body.songId);
    return res.json({
        "res": db['songs'].find()
    });
});

app.get('/player/pause', function (req, res) {
    pauseSong();
    return res.json({
        "res": db['songs'].find()
    });
});

// PARTY

app.post('/party/join', function (req, res) {
    console.log(req.body);
    let p = db['parties'].findOne({
        code: req.body.partyCode
    });

    p.users.push({
        name: req.body.userName
    });

    db['parties'].update({
        code: req.body.partyCode
    }, {
        users: p.users
    });
    return res.json({
        token: jwtGenerate(req.body),
        party: p
    })
});

app.post('/party/start', function (req, res) {
    console.log(req.body);
    let p = {
        "id": `${Math.floor(Math.random() * 100)}`,
        "name": req.body.partyName,
        "code": generateCode(),
        "playlist": [],
        "state": 1,
        "oldState": 1,
        "status": 0,
        "previousSong": "",
        "currentlyPlaying": {},
        "users": [{name: req.body.userName}],
        "oldStatus": 0
    };
    db['parties'].save(p);
    main.startPartyEventLoop();
    return res.json({
        token: jwtGenerate(req.body),
        party: p
    });
});

app.get('/party/:id', function (req, res) {
    let partyId = req.params.id;
    return res.json(db['parties'].find({id: partyId})[0]);
});

app.get('/party/:id/playlist', function (req, res) {
    let partyId = req.params.id;
    return res.json(db['parties'].find({id: partyId})[0].playlist);
});

const playSong = (partyId, songId) => {
    console.log(`play song ${songId}`);
    let song = db['songs'].findOne({id: songId});
    console.log({"songToBePlayed":song});
    db['parties'].update({
        id: partyId
    }, {
        currentlyPlaying: song
    });
    addMessageToQueue(new Message(partyId, 'play', {
        path: song.songUrl,
        mode: 'name'
    }));
};``

const pauseSong = (partyId) => {
    console.log(`pause song`);
    addMessageToQueue(new Message(partyId, 'pause', {}));
};

const jwtGenerate = (data) => {
    return sign(data, theKey, {
        algorithm: 'HS512',
        expiresIn: '12h',
        issuer: 'theehteam'
    });
};

// for verifying the token
const jwtVerify = (token) => {
    return verify(token, theKey, {
        algorithms: ['HS512'],
        issuer: 'theehteam'
    });

};

const generateCode = () => {
    let ALL = "abcdefghijklmnpqrstuvwxyz1234567890".toUpperCase();
    let s = "";
    for (let i = 0; i < 4; i++) {
        s += ALL[Math.floor(Math.random() * ALL.length)];
    }
    return s;
};


const updatePartyState = (partyId, state) => {
    db['parties'].update({
        id: partyId
    }, {
        state
    });
};

const updatePartyOldState = (partyId) => {
    let p = db['parties'].findOne();
    db['parties'].update({
        id: partyId
    }, {
        oldState: p.oldState
    });
};


const updatePartyStatus = (partyId, status) => {
    db['parties'].update({
        id: partyId
    }, {
        status
    });
};

const updatePartyOldStatus = (partyId) => {
    let p = db['parties'].findOne();
    db['parties'].update({
        id: partyId
    }, {
        oldStatus: p.status
    });
};

/**
 *
 * And above here
 *
 */

// this last as a default error page
app.get('*', function (req, res) {
    return res.json("Invalid URL");
});

getPort().then(port => {
    app.listen(port, () => {
        frontSocketServer.listen(FRONT_SOCKET_PORT);
        playerSocketServer.listen(PLAYER_SOCKET_PORT);
        console.log(`service is running on ${port}`);
        console.log(`front socket is running on ${FRONT_SOCKET_PORT}`);
        console.log(`player socket is running on ${PLAYER_SOCKET_PORT}`);
        bonjour.publish({
            name: uuidv1(),
            type: 'http',
            port,
            txt: {server: appName, service: serviceName, type: 'service'}
        });
    });
}).catch(e => console.log(e));

// graceful shutdown
process.on('SIGINT', () => {
    console.log(`Shutting down`);
    playerIO.to('1').emit('stop');
    bonjour.unpublishAll(() => {
        bonjour.destroy();
        process.exit();
    })
});
