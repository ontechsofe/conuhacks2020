"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var routing_controllers_1 = require("routing-controllers");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
var LogMiddleware = /** @class */ (function () {
    function LogMiddleware() {
    }
    LogMiddleware.prototype.use = function (req, res, next) {
        Log_1.default.debug("[EXPRESS] " + req.method + " " + req.path);
        next();
    };
    LogMiddleware = tslib_1.__decorate([
        routing_controllers_1.Middleware({ type: 'before' })
    ], LogMiddleware);
    return LogMiddleware;
}());
exports.LogMiddleware = LogMiddleware;
//# sourceMappingURL=LogMiddleware.js.map