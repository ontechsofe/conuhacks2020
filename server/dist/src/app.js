"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var Log_1 = tslib_1.__importDefault(require("./util/Log"));
var microframework_w3tec_1 = require("microframework-w3tec");
var IocLoader_1 = require("./loaders/IocLoader");
var ExpressLoader_1 = require("./loaders/ExpressLoader");
var SwaggerLoader_1 = require("./loaders/SwaggerLoader");
var MonitorLoader_1 = require("./loaders/MonitorLoader");
var HomeLoader_1 = require("./loaders/HomeLoader");
var FileLoader_1 = require("./loaders/FileLoader");
var SocketLoader_1 = require("./loaders/SocketLoader");
microframework_w3tec_1.bootstrapMicroframework({
    loaders: [
        IocLoader_1.IocLoader,
        ExpressLoader_1.ExpressLoader,
        SocketLoader_1.SocketLoader,
        SwaggerLoader_1.SwaggerLoader,
        MonitorLoader_1.MonitorLoader,
        HomeLoader_1.HomeLoader,
        FileLoader_1.FileLoader
    ]
})
    .then(function () {
    Log_1.default.info("[START] Server is running!");
})
    .catch(function (err) {
    Log_1.default.error("[ERROR] THE SERVER HAS CRASHED: " + err + "\n" + err.stack);
});
//# sourceMappingURL=app.js.map