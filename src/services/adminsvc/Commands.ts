/* Commannd to reset a password */
export class AdminResetPasswordCommand {
  constructor(public email: string, public password: string, public schoolId: string) {}
}

/*
 * Command to create a new Role
 */

export class CreateRoleCommand {
  constructor(public role: string) {}
}

/*
 * Command to create a new School
 */
export class CreateSchoolCommand {
  constructor(public name: string) {}
}

/*
 * Command to delete a School
 */
export class DeleteSchoolCommand {
  constructor(public schoolId: string) {}
}

/*
 * Command to create a new Admin in the school
 */
export class CreateAdminCommand {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public schoolId: string
  ) {}
}

/*
 * Command to assign a Role to a User
 */
export class AssignRoleToUserCommand {
  constructor(public userId: string, public roleId: string) {}
}

/*
 * Command to remove a Role from a User
 */
export class RemoveRoleFromUserCommand {
  constructor(public userId: string, public roleId: string) {}
}

/*
 * Command to delete an Admin
 */
export class DeleteAdminCommand {
  constructor(public adminId: string, public schoolId: string) {}
}

/*
 *   Queries to get all Roles
 */
export class GetAllRolesQuery {}

/* Command to create a new Discipline */
export class CreateDisciplineCommand {
  constructor(public name: string) {}
}

/* Command to delete a Discipline */
export class DeleteDisciplineCommand {
  constructor(public disciplineId: string) {}
}

/* Commannd to update a Discipline */
export class UpdateDisciplineCommand {
  constructor(public disciplineId: string, public name: string) {}
}

/*
 *   Queries to get all Disciplines
 */

export class GetDisciplinesQuery {
  constructor() {}
}
