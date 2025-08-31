// --- Commands (for state-changing operations) ---

/**
 * Command to create a new Classe.
 */
export class CreateClasseCommand {
  constructor(public nom: string, public niveau: string, public schoolId: string) {}
}

/**
 * Command to update an existing Classe.
 */
export class UpdateClasseCommand {
  constructor(
    public classeId: string,
    public nom: string,
    public niveau: string,
    public schoolId: string
  ) {}
}

/**
 * Command to delete a Classe.
 */
export class DeleteClasseCommand {
  constructor(public classeId: string) {}
}

// --- Queries (for data retrieval) ---

/**
 * Query to get all Classes.
 */
export class GetAllClassesQuery {
  constructor(public schoolId: string) {}
}

/**
 * Query to get a specific Classe by its ID.
 */
export class GetClasseByIdQuery {
  constructor(public classeId: string, public schoolId: string) {}
}

/**
 * Query to get all Students in a specific Classe.
 */
export class GetStudentsInClasseQuery {
  constructor(public classeId: string, public schoolId: string) {}
}

/**
 * Query to get all Professors teaching a specific Classe.
 */
export class GetProfessorsInClasseQuery {
  constructor(public classeId: string, public schoolId: string) {}
}

/**
 * Query to get all Parents of students in a specific Classe.
 */
export class GetParentsInClasseQuery {
  constructor(public classeId: string, public schoolId: string) {}
}

/**
 * Query to get all Disciplines in a specific Classe.
 */
export class GetDisciplinesInClasseQuery {
  constructor(public classeId: string, public schoolId: string) {}
}

/**
 * Command to assign a Professor to a Classe.
 */
export class AssignProfesseurToClasseCommand {
  constructor(public classeId: string, public professeurId: string, public schoolId: string) {}
}

/**
 * Command to revoke a Professor to a Classe.
 */
export class RevokeProfesseurToClasseCommand {
  constructor(public classeId: string, public professeurId: string, public schoolId: string) {}
}

/**
 * Command to assign a Matiere (Subject) to a Classe.
 * This can also be used to create a new subject and link it.
 */
export class AssignMatiereToClasseCommand {
  constructor(public classeId: string, public matiereId: string, public schoolId: string) {}
}
