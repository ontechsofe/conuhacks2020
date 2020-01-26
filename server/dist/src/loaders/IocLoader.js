"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typedi_1 = require("typedi");
var routing_controllers_1 = require("routing-controllers");
var class_validator_1 = require("class-validator");
var socket_controllers_1 = require("socket-controllers");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
exports.IocLoader = function (settings) {
    Log_1.default.info("[START] Loading Controllers");
    routing_controllers_1.useContainer(typedi_1.Container);
    socket_controllers_1.useContainer(typedi_1.Container);
    class_validator_1.useContainer(typedi_1.Container);
};
//# sourceMappingURL=IocLoader.js.map