"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var env_1 = require("../env");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
var socket_controllers_1 = require("socket-controllers");
// Controllers
var ConnectionController_1 = require("../api/SocketControllers/ConnectionController");
exports.SocketLoader = function (settings) {
    if (settings) {
        Log_1.default.info("[START] Loading SocketIO");
        var socketApp = socket_controllers_1.createSocketServer(env_1.env.app.socketPort, {
            controllers: [ConnectionController_1.ConnectionController]
        });
        Log_1.default.info("[START] Socket listening on port " + env_1.env.app.socketPort);
        settings.setData('socket_app', socketApp);
    }
};
//# sourceMappingURL=SocketLoader.js.map