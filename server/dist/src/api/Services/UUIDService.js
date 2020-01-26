"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typedi_1 = require("typedi");
var node_ts_uuid_1 = require("node-ts-uuid");
var UUIDService = /** @class */ (function () {
    function UUIDService() {
        this.options = {
            length: 50,
        };
    }
    UUIDService.prototype.new = function () {
        return node_ts_uuid_1.Uuid.generate(this.options);
    };
    UUIDService = tslib_1.__decorate([
        typedi_1.Service(),
        tslib_1.__metadata("design:paramtypes", [])
    ], UUIDService);
    return UUIDService;
}());
exports.default = UUIDService;
//# sourceMappingURL=UUIDService.js.map