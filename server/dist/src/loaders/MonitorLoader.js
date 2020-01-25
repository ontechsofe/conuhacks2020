"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_status_monitor_1 = tslib_1.__importDefault(require("express-status-monitor"));
var env_1 = require("../env");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
exports.MonitorLoader = function (settings) {
    if (settings && env_1.env.monitor.enabled) {
        Log_1.default.info("[START] Loading Monitor");
        var expressApp = settings.getData('express_app');
        expressApp.use(express_status_monitor_1.default());
        expressApp.get(env_1.env.monitor.route, function (req, res, next) { return next(); }, 
        // @ts-ignore
        express_status_monitor_1.default().pageRoute);
    }
};
//# sourceMappingURL=MonitorLoader.js.map