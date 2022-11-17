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
  role?: Roles;
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
  role: Roles;

  constructor(options: Options) {
    this.key = options.key ?? "id";
    this.value = options.value ?? crypto.randomUUID();
    this.secure = options.secure ?? false;
    this.httpOnly = options.httpOnly ?? true;
    this.expires = new Date(options.expires);
    this.sameSite = options.sameSite ?? SameSiteOptions.strict;
    this.path = options.path ?? "/";
    this.domain = options.domain ?? "";
    this.role = options.role ?? Roles.USER;
  }

  public formatAsString(): string {
    return `${this.key}=${this.value};${this.secure ? "Secure;" : ""}${
      this.httpOnly ? "HttpOnly;" : ""
    }Expires=${new Date(this.expires)};SameSite=${this.sameSite}; role=${
      this.role
    }`;
  }
}

module.exports = Cookies;

console.log(new Cookies({ expires: 1000 }).formatAsString());
