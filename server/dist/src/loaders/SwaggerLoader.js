"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var storage_1 = require("class-transformer/storage");
var class_validator_1 = require("class-validator");
var class_validator_jsonschema_1 = require("class-validator-jsonschema");
var routing_controllers_1 = require("routing-controllers");
var routing_controllers_openapi_1 = require("routing-controllers-openapi");
var swaggerUi = tslib_1.__importStar(require("swagger-ui-express"));
var env_1 = require("../env");
var Log_1 = tslib_1.__importDefault(require("../util/Log"));
exports.SwaggerLoader = function (settings) {
    if (settings && env_1.env.swagger.enabled) {
        Log_1.default.info("[START] Loading Swagger");
        var expressApp = settings.getData('express_app');
        var schemas = class_validator_jsonschema_1.validationMetadatasToSchemas(class_validator_1.getFromContainer(class_validator_1.MetadataStorage).validationMetadatas, { classTransformerMetadataStorage: storage_1.defaultMetadataStorage });
        var swaggerFile = routing_controllers_openapi_1.routingControllersToSpec(routing_controllers_1.getMetadataArgsStorage(), {}, {
            components: {
                schemas: schemas
            },
        });
        swaggerFile.info = {
            title: env_1.env.app.name,
            description: env_1.env.app.description,
            version: env_1.env.app.version,
        };
        swaggerFile.servers = [
            {
                url: env_1.env.app.schema + "://" + env_1.env.app.host + ":" + env_1.env.app.port + env_1.env.app.routePrefix,
            },
        ];
        expressApp.use(env_1.env.swagger.route, function (req, res, next) { return next(); }, swaggerUi.serve, swaggerUi.setup(swaggerFile));
    }
};
//# sourceMappingURL=SwaggerLoader.js.map