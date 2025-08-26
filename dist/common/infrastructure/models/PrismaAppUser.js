"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrismaUserToDomain = mapPrismaUserToDomain;
const AppUser_1 = require("../../domain/entities/AppUser");
function mapPrismaUserToDomain(prismaAppUser) {
    var _a, _b;
    const roles = prismaAppUser.userRoles.map((ur) => ur.role.name);
    const user = AppUser_1.AppUser.createBaseUser(prismaAppUser.email, prismaAppUser.password, roles, prismaAppUser.schoolId, prismaAppUser.nom, prismaAppUser.prenom, prismaAppUser.telephone, prismaAppUser.profession, prismaAppUser.biographie, prismaAppUser.children);
    user.setId(prismaAppUser.id);
    user.disciplineIds = (_b = (_a = prismaAppUser.disciplines) === null || _a === void 0 ? void 0 : _a.map((d) => d.name)) !== null && _b !== void 0 ? _b : [];
    return user;
}
