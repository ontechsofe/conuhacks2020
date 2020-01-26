'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var winston_1 = tslib_1.__importDefault(require("winston"));
var env_1 = require("../env");
var createLogger = winston_1.default.createLogger, format = winston_1.default.format, transports = winston_1.default.transports;
var combine = format.combine, timestamp = format.timestamp, printf = format.printf, colorize = format.colorize;
function devFormat() {
    var formatMessage = function (info) { return "[" + info.timestamp + "] [" + info.level + "] " + info.message + " " + (info.durationMs ? "Timer: " + info.durationMs + "ms" : ""); };
    var formatError = function (info) { return "[" + info.timestamp + "] [" + info.level + "] " + info.message; };
    var selectFormat = function (info) {
        return info instanceof Error ? formatError(info) : formatMessage(info);
    };
    // @ts-ignore
    return printf(selectFormat);
}
var consoleLogFormat = function () {
    return combine(colorize({ all: false }), timestamp(), devFormat());
};
var fileLogFormat = function () {
    return combine(timestamp(), devFormat());
};
var logger = createLogger({
    level: (env_1.env.isProduction ? 'info' : 'debug'),
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7,
        silly: 8
    },
    exitOnError: false,
    transports: [
        new transports.Console({
            handleExceptions: true,
            format: consoleLogFormat()
        }),
        new transports.File({
            filename: 'combined.log',
            format: fileLogFormat()
        })
    ],
    exceptionHandlers: [
        new transports.File({
            filename: 'exceptions.log'
        })
    ]
});
winston_1.default.addColors({
    info: 'yellow'
});
exports.default = logger;
//# sourceMappingURL=Log.js.map