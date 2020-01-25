"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typedi_1 = require("typedi");
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("../../env");
var WebTokenService = /** @class */ (function () {
    function WebTokenService() {
        this.algorithm = 'HS512';
        this.expiry = '12h';
        this.issuer = 'UpNext';
        this.secretKey = env_1.env.app.jwt.key;
        this.encryptionOptions = {
            algorithm: this.algorithm,
            expiresIn: this.expiry,
            issuer: this.issuer
        };
        this.decryptionOptions = {
            algorithms: [this.algorithm],
            issuer: this.issuer
        };
    }
    WebTokenService.prototype.generateFrom = function (data, expire) {
        if (expire === void 0) { expire = this.expiry; }
        this.encryptionOptions.expiresIn = expire;
        return jsonwebtoken_1.sign(data, this.secretKey, this.encryptionOptions);
    };
    WebTokenService.prototype.verify = function (jwt) {
        var data = {};
        var error = null;
        try {
            data = jsonwebtoken_1.verify(jwt, this.secretKey, this.decryptionOptions);
        }
        catch (e) {
            error = { name: e.name, message: e.message };
        }
        return { error: error, data: data };
    };
    WebTokenService = tslib_1.__decorate([
        typedi_1.Service(),
        tslib_1.__metadata("design:paramtypes", [])
    ], WebTokenService);
    return WebTokenService;
}());
exports.default = WebTokenService;
var VerifyResponse = /** @class */ (function () {
    function VerifyResponse() {
    }
    return VerifyResponse;
}());
//# sourceMappingURL=WebTokenService.js.map