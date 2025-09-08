// --- Commands for Cours ---

export class CreateCoursCommand {
  constructor(
    public jour: string,
    public heure: string,
    public disciplineId: string,
    public professeurId: string,
    public classeId: string,
    public schoolId: string
  ) {}
}

export class UpdateCoursCommand {
  constructor(
    public coursId: string,
    public jour: string,
    public heure: string,
    public disciplineId: string,
    public professeurId: string,
    public classeId: string,
    public schoolId: string
  ) {}
}

export class DeleteCoursCommand {
  constructor(public coursId: string) {}
}

// --- Command for assigning a Professor or Subject to a Course ---
export class AssignProfesseurToCoursCommand {
  constructor(public coursId: string, public professeurId: string, public schoolId: string) {}
}

export class AssignMatiereToCoursCommand {
  constructor(public coursId: string, public matiereId: string, public schoolId: string) {}
}
// --- Queries for Cours ---

export class GetAllCoursQuery {
  constructor(public schoolId: string) {}
}

export class GetCoursByIdQuery {
  constructor(public coursId: string, public schoolId: string) {}
}

export class GetCoursByProfesseurQuery {
  constructor(public professeurId: string, public schoolId: string) {}
}

export class GetCoursByClasseQuery {
  constructor(public classeId: string, public schoolId: string) {}
}

export class GetCoursByDayQuery {
  constructor(public day: string, public schoolId: string) {}
}

export class GetCoursByDayAndHourQuery {
  constructor(public day: string, public hour: string, public schoolId: string) {}
}

export class GetCoursByWeekQuery {
  constructor(public weekStart: Date, public weekEnd: Date, public schoolId: string) {}
}

export class GetCoursByProfesseurAndDayQuery {
  constructor(public professeurId: string, public day: string, public schoolId: string) {}
}

export class GetCoursByProfesseurAndWeekQuery {
  constructor(
    public professeurId: string,
    public weekStart: Date,
    public weekEnd: Date,
    public schoolId: string
  ) {}
}

export class GetCoursByClasseAndDayQuery {
  constructor(public classeId: string, public day: string, public schoolId: string) {}
}

export class GetCoursByClasseAndWeekQuery {
  constructor(
    public classeId: string,
    public weekStart: Date,
    public weekEnd: Date,
    public schoolId: string
  ) {}
}

export class GetAllDisciplinesQuery {
  constructor(public schoolId: string) {}
}
export class GetDisciplineByIdQuery {
  constructor(public schoolId: string, public id: string) {}
}

export class AssignDisciplinesToTeacherCommand {
  constructor(public readonly teacherId: string, public readonly disciplineIds: string[]) {}
}

export class RevokeDisciplinesFromTeacherCommand {
  constructor(public readonly teacherId: string, public readonly disciplineIds: string[]) {}
}
