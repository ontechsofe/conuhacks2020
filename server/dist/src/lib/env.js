"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var glob_1 = tslib_1.__importDefault(require("glob"));
function getOsEnv(key) {
    if (typeof process.env[key] === 'undefined') {
        throw new Error("Environment variable " + key + " is not set.");
    }
    return process.env[key];
}
exports.getOsEnv = getOsEnv;
function getOsPaths(key) {
    var out = [];
    getOsEnvArray(key).map(function (p) { return glob_1.default.sync(p); }).forEach(function (p) { return out.push.apply(out, p); });
    return out;
}
exports.getOsPaths = getOsPaths;
function getOsEnvArray(key, delimiter) {
    if (delimiter === void 0) { delimiter = ','; }
    return process.env[key] && process.env[key].split(delimiter) || [];
}
exports.getOsEnvArray = getOsEnvArray;
function normalizePort(port) {
    var parsedPort = parseInt(port, 10);
    if (parsedPort >= 0) {
        return parsedPort;
    }
    return null;
}
exports.normalizePort = normalizePort;
//# sourceMappingURL=env.js.map