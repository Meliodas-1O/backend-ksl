"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123!@#456";
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        const error = {
            reason: "You are not connected.",
            statusCode: StatusCode_1.StatusCode.UNAUTHORIZED,
        };
        res.status(StatusCode_1.StatusCode.UNAUTHORIZED).json(error);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        const error = {
            reason: "Invalid or expired token",
            statusCode: StatusCode_1.StatusCode.FORBIDDEN,
        };
        res.status(StatusCode_1.StatusCode.FORBIDDEN).json(error);
    }
};
exports.authenticateToken = authenticateToken;
