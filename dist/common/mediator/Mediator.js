"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediator = void 0;
class Mediator {
    constructor() {
        this.handlers = new Map();
    }
    register(commandName, handler) {
        this.handlers.set(commandName, handler);
    }
    send(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers.get(command.constructor.name);
            if (!handler) {
                throw new Error(`No handler registered for ${command.constructor.name}`);
            }
            return handler.execute(command);
        });
    }
}
exports.mediator = new Mediator();
