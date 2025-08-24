// --- Queries to get a specific entity in a school context ---

export class GetStudentByIdQuery {
  constructor(public studentId: string, public schoolId: string) {}
}

export class GetTeacherByIdQuery {
  constructor(public teacherId: string, public schoolId: string) {}
}

export class GetParentByIdQuery {
  constructor(public parentId: string, public schoolId: string) {}
}

export class GetOneClasseByIdQuery {
  constructor(public classeId: string, public schoolId: string) {}
}
