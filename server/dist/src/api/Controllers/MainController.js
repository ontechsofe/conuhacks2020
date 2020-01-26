"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var MainController = /** @class */ (function () {
    function MainController() {
    }
    MainController.prototype.getAllParties = function () {
        return [];
    };
    tslib_1.__decorate([
        routing_controllers_1.Post('/get'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Array)
    ], MainController.prototype, "getAllParties", null);
    MainController = tslib_1.__decorate([
        routing_controllers_1.JsonController(''),
        tslib_1.__metadata("design:paramtypes", [])
    ], MainController);
    return MainController;
}());
exports.MainController = MainController;
//# sourceMappingURL=MainController.js.map