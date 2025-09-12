/*
 * Command to create a new Role
 */

import {
  CreateRoleCommand,
  CreateSchoolCommand,
  DeleteSchoolCommand,
  CreateAdminCommand,
  AssignRoleToUserCommand,
  RemoveRoleFromUserCommand,
  DeleteAdminCommand,
  GetAllRolesQuery,
  CreateDisciplineCommand,
  GetDisciplinesQuery,
  DeleteDisciplineCommand,
} from "./Commands";
import { IAdminRepository } from "../../common/domain/repository/IAdminRepository";
import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { Admin } from "../../common/domain/entities/Admin";
import { RoleEntity } from "../../common/domain/entities/RoleEntity";
import { School } from "../../common/domain/entities/School";
import { IPasswordHasher } from "../../common/domain/contracts/IPasswordHasher";

export class CreateRoleCommandHandler
  implements ICommandHandler<CreateRoleCommand, any>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: CreateRoleCommand): Promise<any> {
    const existingRole = await this.adminRepository.findRoleByName(
      command.role
    );
    if (existingRole) {
      return existingRole;
    }
    const role = RoleEntity.createRole(command.role);
    return this.adminRepository.createRole(role);
  }
}

export class GetAllRolesQueryHandler
  implements IQueryHandler<GetAllRolesQuery, any[]>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(query: GetAllRolesQuery): Promise<any[]> {
    return this.adminRepository.findAllRoles();
  }
}

export class CreateSchoolCommandHandler
  implements ICommandHandler<CreateSchoolCommand, any>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: CreateSchoolCommand): Promise<any> {
    // Check if a school with the same name already exists
    const existingSchool = await this.adminRepository.findSchoolWithName(
      command.name
    );
    if (existingSchool) {
      throw new Error("A school with this name already exists.");
    }
    const school = School.createSchool(command.name);
    return this.adminRepository.createSchool(school);
  }
}
export class DeleteSchoolCommandHandler
  implements ICommandHandler<DeleteSchoolCommand, void>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: DeleteSchoolCommand): Promise<void> {
    return this.adminRepository.deleteSchool(command.schoolId);
  }
}
export class CreateAdminCommandHandler
  implements ICommandHandler<CreateAdminCommand, any>
{
  constructor(
    private adminRepository: IAdminRepository,
    private passwordHasher: IPasswordHasher
  ) {}
  async execute(command: CreateAdminCommand): Promise<any> {
    const hashedPassword = await this.passwordHasher.hash(command.password);

    const admin = Admin.createAdmin(
      command.firstName,
      command.lastName,
      command.email,
      hashedPassword,
      command.schoolId
    );
    return this.adminRepository.createAdmin(admin);
  }
}

export class AssignRoleToUserCommandHandler
  implements ICommandHandler<AssignRoleToUserCommand, any>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: AssignRoleToUserCommand): Promise<any> {
    return this.adminRepository.assignRoleToUser(
      command.userId,
      command.roleId
    );
  }
}
export class RemoveRoleFromUserCommandHandler
  implements ICommandHandler<RemoveRoleFromUserCommand, any>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: RemoveRoleFromUserCommand): Promise<any> {
    return this.adminRepository.removeRoleFromUser(
      command.userId,
      command.roleId
    );
  }
}
export class DeleteAdminCommandHandler
  implements ICommandHandler<DeleteAdminCommand, void>
{
  constructor(private adminRepository: IAdminRepository) {}

  async execute(command: DeleteAdminCommand): Promise<void> {
    return this.adminRepository.deleteAdmin(command.adminId, command.schoolId);
  }
}

export class CreateDisciplineCommandHandler
  implements ICommandHandler<CreateDisciplineCommand, any>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: CreateDisciplineCommand): Promise<any> {
    return this.adminRepository.createDiscipline(command.name);
  }
}

export class DeleteDisciplineCommandHandler
  implements ICommandHandler<DeleteDisciplineCommand, void>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: DeleteDisciplineCommand): Promise<void> {
    return this.adminRepository.deleteDiscipline(command.disciplineId);
  }
}

export class GetDisciplinesQueryHandler
  implements ICommandHandler<GetDisciplinesQuery, any>
{
  constructor(private adminRepository: IAdminRepository) {}
  async execute(command: GetDisciplinesQuery): Promise<any> {
    return this.adminRepository.findAllisciplines();
  }
}
