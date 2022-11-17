import { ServerResponse } from "http";
const crypto = require("crypto");

enum SameSiteOptions {
  "lax" = "Lax",
  "strict" = "Strict",
}

enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface Options {
  key?: string;
  value?: string;
  secure?: boolean;
  httpOnly?: boolean;
  expires: number | Date;
  path?: string;
  domain?: string;
  sameSite?: SameSiteOptions;
}

class Cookies {
  key?: string;
  value?: string;
  secure?: boolean;
  httpOnly?: boolean;
  expires: number | Date;
  path?: string;
  domain?: string;
  sameSite?: SameSiteOptions;

  constructor(options: Options) {
    this.key = options.key ?? "id";
    this.value = options.value ?? crypto.randomUUID();
    this.secure = options.secure ?? false;
    this.httpOnly = options.httpOnly ?? true;
    this.expires = new Date(options.expires);
    this.sameSite = options.sameSite ?? SameSiteOptions.strict;
    this.path = options.path ?? "/";
    this.domain = options.domain ?? "";
  }

  public formatAsString(): string {
    return `${this.key}=${this.value};${this.secure ? "Secure;" : ""}${
      this.httpOnly ? "HttpOnly;" : ""
    }Expires=${new Date(this.expires)};SameSite=${this.sameSite};`;
  }
}

module.exports = Cookies;

console.log(new Cookies({ expires: 1000 }).formatAsString());
