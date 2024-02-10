"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Email is incorrect" })
        .max(64, { message: "Email must not exceed 64 charecters" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(64, { message: "Password must not exceed 64 characters" }),
});
