"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var path = tslib_1.__importStar(require("path"));
var pkg = tslib_1.__importStar(require("../package.json"));
var env_1 = require("./lib/env");
var fs_1 = require("fs");
dotenv_1.default.config({ path: path.join(process.cwd(), ".env" + ((process.env.NODE_ENV === 'test') ? '.test' : '')) });
exports.env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: env_1.getOsEnv('PRODUCTION') === 'true',
    isTest: process.env.NODE_ENV === 'test',
    app: {
        name: env_1.getOsEnv('APP_NAME'),
        version: pkg.version,
        description: pkg.description,
        host: env_1.getOsEnv('APP_HOST'),
        schema: env_1.getOsEnv('APP_SCHEMA'),
        routePrefix: env_1.getOsEnv('APP_ROUTE_PREFIX'),
        port: env_1.normalizePort(process.env.PORT || env_1.getOsEnv('APP_PORT')),
        socketPort: env_1.normalizePort(process.env.PORT || env_1.getOsEnv('APP_SOCKET_PORT')),
        jwt: {
            key: fs_1.readFileSync(env_1.getOsEnv('APP_JWT_KEY')).toString()
        },
        front: {
            url: env_1.getOsEnv('APP_FRONT_URL')
        }
    },
    swagger: {
        route: env_1.getOsEnv('SWAGGER_ROUTE'),
        enabled: env_1.getOsEnv('SWAGGER_ENABLED')
    },
    monitor: {
        route: env_1.getOsEnv('MONITOR_ROUTE'),
        enabled: env_1.getOsEnv('MONITOR_ENABLED')
    },
};
//# sourceMappingURL=env.js.map