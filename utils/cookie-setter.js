"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var SameSiteOptions;
(function (SameSiteOptions) {
    SameSiteOptions["lax"] = "Lax";
    SameSiteOptions["strict"] = "Strict";
})(SameSiteOptions || (SameSiteOptions = {}));
var Roles;
(function (Roles) {
    Roles["USER"] = "USER";
    Roles["ADMIN"] = "ADMIN";
})(Roles || (Roles = {}));
var Cookies = /** @class */ (function () {
    function Cookies(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.key = (_a = options.key) !== null && _a !== void 0 ? _a : "id";
        this.value = (_b = options.value) !== null && _b !== void 0 ? _b : crypto.randomUUID();
        this.secure = (_c = options.secure) !== null && _c !== void 0 ? _c : false;
        this.httpOnly = (_d = options.httpOnly) !== null && _d !== void 0 ? _d : true;
        this.expires = new Date(options.expires);
        this.sameSite = (_e = options.sameSite) !== null && _e !== void 0 ? _e : SameSiteOptions.strict;
        this.path = (_f = options.path) !== null && _f !== void 0 ? _f : "/";
        this.domain = (_g = options.domain) !== null && _g !== void 0 ? _g : "";
        this.role = (_h = options.role) !== null && _h !== void 0 ? _h : Roles.USER;
    }
    Cookies.prototype.formatAsString = function () {
        return "".concat(this.key, "=").concat(this.value, ";").concat(this.secure ? "Secure;" : "").concat(this.httpOnly ? "HttpOnly;" : "", "Expires=").concat(new Date(this.expires), ";SameSite=").concat(this.sameSite, "; role=").concat(this.role);
    };
    return Cookies;
}());
module.exports = Cookies;
console.log(new Cookies({ expires: 1000 }).formatAsString());
