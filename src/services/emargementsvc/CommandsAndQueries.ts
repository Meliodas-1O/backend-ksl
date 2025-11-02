interface Emargement {
  classeId: string;
  disciplineId: string;
  debut: Date;
  fin: Date;
  seanceCounter: number;
  content: string;
  schoolId: string;
  additionalInfo?: string;
}

// -------------------------------------------
// 🟢 Command: Create a new Emargement record
// -------------------------------------------

/**
 * Command to create a new emargement (teacher attendance) record.
 * This is used when a teacher completes a session and submits details of the session.
 */
export class CreateEmargementCommand {
  constructor(
    public professeurId: string,
    public classeId: string,
    public disciplineId: string,
    public debut: Date,
    public fin: Date,
    public seanceCounter: number,
    public content: string,
    public schoolId: string,
    public additionalInfo?: string
  ) {}
}

export class DeleteEmargementCommand {
  constructor(public emargementId: string, public schoolId: string) {}
}

export class UpdateEmargementCommand {
  constructor(
    public emargementId: string,
    public emargement: Emargement,
    public schoolId: string
  ) {}
}

// -------------------------------------------
// 🔵 Queries for Emargement
// -------------------------------------------

/**
 * Query to retrieve all emargement records for a school.
 * Typically used by a school director to view all sessions.
 */
export class GetAllEmargementsQuery {
  constructor(public schoolId: string) {}
}

/**
 * Query to retrieve a single emargement by ID within a school.
 * Used to show detailed info about a specific session.
 */
export class GetEmargementByIdQuery {
  constructor(public emargementId: string, public schoolId: string) {}
}

/**
 * Query to get all emargements by a specific teacher in a given school.
 * Useful for filtering a teacher's session history.
 */
export class GetEmargementByUserIdQuery {
  constructor(public professeurId: string, public schoolId: string) {}
}
