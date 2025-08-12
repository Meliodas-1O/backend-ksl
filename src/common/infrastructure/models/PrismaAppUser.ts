import { Role } from "../../application/dto/Role";
import { AppUser } from "../../domain/entities/AppUser";
import { PrismaUserRole } from "./PrismaUserRole";
import { PrismaUserSchool } from "./PrismaUserSchool";

export interface PrismaAppUser {
  id: string;
  email: string;
  password: string;
  schoolId: string | null;

  nom: string | null;
  prenom: string | null;
  telephone: string | null;
  profession: string | null;
  biographie: string | null;

  userRoles: PrismaUserRole[];
  userSchools: PrismaUserSchool[];
  children: any;
}

export function mapPrismaUserToDomain(prismaAppUser: PrismaAppUser): AppUser {
  const roles: Role[] = prismaAppUser.userRoles.map((ur) => ur.role.name as unknown as Role);

  const user: AppUser = AppUser.createBaseUser(
    prismaAppUser.email,
    prismaAppUser.password,
    roles,
    prismaAppUser.schoolId!,
    prismaAppUser.nom!,
    prismaAppUser.prenom!,
    prismaAppUser.telephone,
    prismaAppUser.profession,
    prismaAppUser.biographie,
    prismaAppUser.children
  );
  user.setId(prismaAppUser.id);
  return user;
}
