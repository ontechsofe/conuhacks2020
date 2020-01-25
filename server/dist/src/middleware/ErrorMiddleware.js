"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var routing_controllers_1 = require("routing-controllers");
var env_1 = require("../env");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
var ErrorMiddleware = /** @class */ (function () {
    function ErrorMiddleware() {
        this.isProduction = env_1.env.isProduction;
    }
    ErrorMiddleware.prototype.error = function (error, req, res, next) {
        res.status(error.httpCode || 500);
        res.json({
            name: error.name,
            message: error.message
        });
        if (this.isProduction) {
            Log_1.default.error(error.name + " " + error.message);
        }
        else {
            Log_1.default.error(error.name + " " + error.message + "\n" + error.stack);
        }
    };
    ErrorMiddleware = tslib_1.__decorate([
        routing_controllers_1.Middleware({ type: 'after' }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ErrorMiddleware);
    return ErrorMiddleware;
}());
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map