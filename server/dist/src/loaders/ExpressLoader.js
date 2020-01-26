"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var routing_controllers_1 = require("routing-controllers");
var env_1 = require("../env");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
// Middleware
var LogMiddleware_1 = require("../middleware/LogMiddleware");
var SecurityMiddleware_1 = require("../middleware/SecurityMiddleware");
var ErrorMiddleware_1 = require("../middleware/ErrorMiddleware");
// Controllers
var MainController_1 = require("../api/Controllers/MainController");
exports.ExpressLoader = function (settings) {
    if (settings) {
        Log_1.default.info("[START] Loading Express");
        var expressApp = routing_controllers_1.createExpressServer({
            cors: true,
            classTransformer: true,
            routePrefix: env_1.env.app.routePrefix,
            defaultErrorHandler: false,
            controllers: [
                MainController_1.MainController,
            ],
            middlewares: [
                LogMiddleware_1.LogMiddleware,
                SecurityMiddleware_1.SecurityMiddleware,
                ErrorMiddleware_1.ErrorMiddleware
            ]
        });
        if (!env_1.env.isTest) {
            var server = expressApp
                .listen(env_1.env.app.port, function () { return Log_1.default.info("[START] Server Listening " + env_1.env.app.port); });
            settings.setData('express_server', server);
        }
        settings.setData('express_app', expressApp);
    }
};
//# sourceMappingURL=ExpressLoader.js.map