/**
 * =========================================================================
 *
 * COMMANDS
 *
 * =========================================================================
 */

/**
 * Command for creating a new student attendance record.
 * This object carries all the necessary data for the creation operation.
 */
export class CreateStudentAttendanceCommand {
  constructor(
    public studentId: string,
    public disciplineId: string,
    public type: string,
    public date: Date
  ) {}
}

// ---

/**
 * Command for updating an existing student attendance record.
 * This object contains the ID of the record to update and the new data.
 */
export class UpdateStudentAttendanceCommand {
  constructor(
    public id: string,
    public data: {
      type?: string;
      date?: Date;
      disciplineId?: string;
    }
  ) {}
}

// ---

/**
 * Command for deleting a student attendance record.
 * This object simply holds the ID of the record to be deleted.
 */
export class DeleteStudentAttendanceCommand {
  constructor(public id: string) {}
}

/**
 * =========================================================================
 *
 * QUERIES
 *
 * =========================================================================
 */

/**
 * Query to find a student attendance record by its ID.
 * This is a read-only object for fetching a single record.
 */
export class FindStudentAttendanceByIdQuery {
  constructor(public id: string) {}
}

// ---

/**
 * Query to find all student attendance records for a specific student.
 */
export class FindStudentAttendanceByStudentIdQuery {
  constructor(public studentId: string) {}
}

// ---

/**
 * Query to find all student attendance records for a specific discipline.
 */
export class FindStudentAttendanceByDisciplineIdQuery {
  constructor(public disciplineId: string) {}
}

// ---

/**
 * Query to find all student attendance records by a specific type (e.g., "Present", "Absent").
 */
export class FindStudentAttendanceByTypeQuery {
  constructor(public type: string) {}
}
