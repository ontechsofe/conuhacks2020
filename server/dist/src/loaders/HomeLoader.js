"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var env_1 = require("../env");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
exports.HomeLoader = function (settings) {
    if (settings) {
        Log_1.default.info("[START] Loading Root JSON");
        var expressApp = settings.getData('express_app');
        expressApp.get(env_1.env.app.routePrefix, function (req, res) {
            return res.json({
                name: env_1.env.app.name,
                version: env_1.env.app.version,
                description: env_1.env.app.description,
            });
        });
    }
};
//# sourceMappingURL=HomeLoader.js.map