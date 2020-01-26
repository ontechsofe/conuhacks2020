const axios = require('axios'),
    socket = require('socket.io-client')('http://569516f3.ngrok.io')

var myArgs = process.argv.slice(2)
var partyId = myArgs[0]

socket.on('connect', () => {
    socket.emit('join-room', partyId)
    console.log('Connected!')
})

socket.on('play', (data) => {
    playMusic(data.path, data.mode)
}) 

socket.on('pause', () => {
    pauseMusic()
})

socket.on('unpause', () => {
    unpauseMusic()
})

socket.on('stop', () => {
    stopMusic()
})

socket.on('status', async () => {
    let x = await getStatus()
    socket.emit('got-status', x)
})

socket.on('disconnect', () => {
    console.log('Disconnected!')
})

const getStatus = async () => {
    try {
        let res = await axios.get('http://localhost:8080/status')
        return {status: res.data, id: partyId} 
    } catch (error) {
        console.error(error)
    }
}

const stopMusic = () => {
    try {
        axios.post('http://localhost:8080/stop').then((res) => {console.log(res.data)}).catch((error) => console.error(error))
    } catch (error) {
        console.error(error)
    }
}

const playMusic = (path, mode) => {
    if (mode == "url") {
        playMusicUrl(path)
    } else if (mode == "name") {
        playMusicName(path)
    } else {
        console.log("Error: Unknown mode passed from Server")
    }
}

const playMusicName = (name) => {
    try {
        axios.post(`http://localhost:8080/play?name=${name}`).then((res) => {console.log(res.data)}).catch((error) => console.error(error))
    } catch (error) {
        console.error(error)
    }
}

const playMusicUrl = (url) => {
    try {
        axios.post(`http://localhost:8080/play?url=${url}`).then((res) => {console.log(res.data)}).catch((error) => console.error(error))
    } catch (error) {
        console.error(error)
    }
}

const pauseMusic = () => {
    try {
        axios.post('http://localhost:8080/pause').then((res) => {console.log(res.data)}).catch((error) => console.error(error))
    } catch (error) {
        console.error(error)
    }
}

const unpauseMusic = () => {
    try {
        axios.post('http://localhost:8080/unpause').then((res) => {console.log(res.data)}).catch((error) => console.error(error))
    } catch (error) {
        console.error(error)
    }
}

const downloadSong = (url) => {
    try {
        axios.post(`http://localhost:8080/download?url=${url}`).then((res) => {console.log(res.data)}).catch((error) => {console.error(error)})
    } catch (error) {
        console.error(error)
    }
}

stopMusic()