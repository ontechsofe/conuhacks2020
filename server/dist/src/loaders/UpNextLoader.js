"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
var typedi_1 = require("typedi");
var UpNextService_1 = tslib_1.__importDefault(require("../api/Services/UpNextService"));
exports.UpNextLoader = function (settings) {
    if (settings) {
        Log_1.default.info("[START] Loading UpNext");
        typedi_1.Container.get(UpNextService_1.default);
    }
};
//# sourceMappingURL=UpNextLoader.js.map