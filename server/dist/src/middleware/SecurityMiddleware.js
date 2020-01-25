"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var helmet_1 = tslib_1.__importDefault(require("helmet"));
var routing_controllers_1 = require("routing-controllers");
var SecurityMiddleware = /** @class */ (function () {
    function SecurityMiddleware() {
    }
    SecurityMiddleware.prototype.use = function (req, res, next) {
        return helmet_1.default()(req, res, next);
    };
    SecurityMiddleware = tslib_1.__decorate([
        routing_controllers_1.Middleware({ type: 'before' })
    ], SecurityMiddleware);
    return SecurityMiddleware;
}());
exports.SecurityMiddleware = SecurityMiddleware;
//# sourceMappingURL=SecurityMiddleware.js.map