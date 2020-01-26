"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var socket_controllers_1 = require("socket-controllers");
var Log_1 = tslib_1.__importDefault(require("../../util/Log"));
var ConnectionController = /** @class */ (function () {
    function ConnectionController() {
    }
    ConnectionController.prototype.connect = function (socket) {
        Log_1.default.debug("[SOCKET] client connected: " + socket.id);
    };
    ConnectionController.prototype.disconnect = function (socket) {
        Log_1.default.debug("[SOCKET] client disconnected: " + socket.id);
    };
    tslib_1.__decorate([
        socket_controllers_1.OnConnect(),
        tslib_1.__param(0, socket_controllers_1.ConnectedSocket()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConnectionController.prototype, "connect", null);
    tslib_1.__decorate([
        socket_controllers_1.OnDisconnect(),
        tslib_1.__param(0, socket_controllers_1.ConnectedSocket()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConnectionController.prototype, "disconnect", null);
    ConnectionController = tslib_1.__decorate([
        socket_controllers_1.SocketController()
    ], ConnectionController);
    return ConnectionController;
}());
exports.ConnectionController = ConnectionController;
//# sourceMappingURL=ConnectionController.js.map