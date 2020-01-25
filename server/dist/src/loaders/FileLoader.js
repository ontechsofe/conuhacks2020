"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express = tslib_1.__importStar(require("express"));
var path = tslib_1.__importStar(require("path"));
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
exports.FileLoader = function (settings) {
    if (settings) {
        Log_1.default.info("[START] Loading Public Dir");
        var expressApp = settings.getData('express_app');
        expressApp.use(express.static(path.join(__dirname, '..', 'Public'), { maxAge: 31557600000 }));
    }
};
//# sourceMappingURL=FileLoader.js.map