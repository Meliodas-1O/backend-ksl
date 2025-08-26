"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "supersecretkey123!@#456";
exports.jwtService = {
    sign(payload) {
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "1h" });
    },
    verify(token) {
        return jsonwebtoken_1.default.verify(token, secret);
    },
};
