"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
exports.isValidRole = isValidRole;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["TEACHER"] = 1] = "TEACHER";
    Role[Role["PARENT"] = 2] = "PARENT";
})(Role || (exports.Role = Role = {}));
function isValidRole(value) {
    const validRoles = Object.values(Role).filter((v) => typeof v === "number");
    return typeof value === "number" && validRoles.includes(value);
}
