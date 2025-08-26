import { ICommandHandler } from "../../../common/domain/contracts/ICommandHandler";
import {
  UpdateParentFromAdminQuery,
  UpdateTeacherFromAdminQuery,
  UpdateSelfTeacherQuery,
  UpdateSelfParentQuery,
} from "./Commands";
import { IUserRepository } from "../../../common/domain/repository/IUserRepository";

// Update Parent Handler
export class UpdateParentFromAdminCommandHandler
  implements ICommandHandler<UpdateParentFromAdminQuery, any | null>
{
  constructor(private appUserRepository: IUserRepository) {}

  async execute(command: UpdateParentFromAdminQuery): Promise<any | null> {
    const parent = {
      nom: command.nom,
      prenom: command.prenom,
      email: command.email,
      telephone: command.telephone,
    };

    return this.appUserRepository.updateParent(command.parentId, parent, command.schoolId);
  }
}

// Update Teacher Handler
export class UpdateTeacherFromAdminCommandHandler
  implements ICommandHandler<UpdateTeacherFromAdminQuery, any | null>
{
  constructor(private appUserRepository: IUserRepository) {}

  async execute(command: UpdateTeacherFromAdminQuery): Promise<any | null> {
    const teacher = {
      nom: command.nom,
      prenom: command.prenom,
      email: command.email,
      telephone: command.telephone,
      classes: command.classes,
    };

    return this.appUserRepository.updateTeacher(command.profId, teacher, command.schoolId);
  }
}

// Update Teacher (Self) Handler
export class UpdateSelfTeacherCommandHandler
  implements ICommandHandler<UpdateSelfTeacherQuery, any | null>
{
  constructor(private appUserRepository: IUserRepository) {}

  async execute(command: UpdateSelfTeacherQuery): Promise<any | null> {
    const teacher = {
      nom: command.nom,
      prenom: command.prenom,
      email: command.email,
      telephone: command.telephone,
      biographie: command.biographie,
      adresse: command.adresse,
      schoolId: command.schoolId,
    };

    return this.appUserRepository.updateTeacher(command.profId, teacher, command.schoolId);
  }
}

// Update Parent (Self) Handler
export class UpdateSelfParentCommandHandler
  implements ICommandHandler<UpdateSelfParentQuery, any | null>
{
  constructor(private appUserRepository: IUserRepository) {}

  async execute(command: UpdateSelfParentQuery): Promise<any | null> {
    const parent = {
      nom: command.nom,
      prenom: command.prenom,
      email: command.email,
      telephone: command.telephone,
      profession: command.profession,
      adresse: command.adresse,
      schoolId: command.schoolId,
    };

    return this.appUserRepository.updateParent(command.parentId, parent, command.schoolId);
  }
}
