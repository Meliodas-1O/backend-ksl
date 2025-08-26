"use strict";
// --- Commands for Cours ---
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDisciplineByIdQuery = exports.GetAllDisciplinesQuery = exports.GetCoursByClasseAndWeekQuery = exports.GetCoursByClasseAndDayQuery = exports.GetCoursByProfesseurAndWeekQuery = exports.GetCoursByProfesseurAndDayQuery = exports.GetCoursByWeekQuery = exports.GetCoursByDayAndHourQuery = exports.GetCoursByDayQuery = exports.GetCoursByClasseQuery = exports.GetCoursByProfesseurQuery = exports.GetCoursByIdQuery = exports.GetAllCoursQuery = exports.AssignMatiereToCoursCommand = exports.AssignProfesseurToCoursCommand = exports.DeleteCoursCommand = exports.UpdateCoursCommand = exports.CreateCoursCommand = void 0;
class CreateCoursCommand {
    constructor(jour, heure, disciplineId, professeurId, classeId, schoolId) {
        this.jour = jour;
        this.heure = heure;
        this.disciplineId = disciplineId;
        this.professeurId = professeurId;
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.CreateCoursCommand = CreateCoursCommand;
class UpdateCoursCommand {
    constructor(coursId, jour, heure, disciplineId, professeurId, classeId, schoolId) {
        this.coursId = coursId;
        this.jour = jour;
        this.heure = heure;
        this.disciplineId = disciplineId;
        this.professeurId = professeurId;
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.UpdateCoursCommand = UpdateCoursCommand;
class DeleteCoursCommand {
    constructor(coursId) {
        this.coursId = coursId;
    }
}
exports.DeleteCoursCommand = DeleteCoursCommand;
// --- Command for assigning a Professor or Subject to a Course ---
class AssignProfesseurToCoursCommand {
    constructor(coursId, professeurId, schoolId) {
        this.coursId = coursId;
        this.professeurId = professeurId;
        this.schoolId = schoolId;
    }
}
exports.AssignProfesseurToCoursCommand = AssignProfesseurToCoursCommand;
class AssignMatiereToCoursCommand {
    constructor(coursId, matiereId, schoolId) {
        this.coursId = coursId;
        this.matiereId = matiereId;
        this.schoolId = schoolId;
    }
}
exports.AssignMatiereToCoursCommand = AssignMatiereToCoursCommand;
// --- Queries for Cours ---
class GetAllCoursQuery {
    constructor(schoolId) {
        this.schoolId = schoolId;
    }
}
exports.GetAllCoursQuery = GetAllCoursQuery;
class GetCoursByIdQuery {
    constructor(coursId, schoolId) {
        this.coursId = coursId;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByIdQuery = GetCoursByIdQuery;
class GetCoursByProfesseurQuery {
    constructor(professeurId, schoolId) {
        this.professeurId = professeurId;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByProfesseurQuery = GetCoursByProfesseurQuery;
class GetCoursByClasseQuery {
    constructor(classeId, schoolId) {
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByClasseQuery = GetCoursByClasseQuery;
class GetCoursByDayQuery {
    constructor(day, schoolId) {
        this.day = day;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByDayQuery = GetCoursByDayQuery;
class GetCoursByDayAndHourQuery {
    constructor(day, hour, schoolId) {
        this.day = day;
        this.hour = hour;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByDayAndHourQuery = GetCoursByDayAndHourQuery;
class GetCoursByWeekQuery {
    constructor(weekStart, weekEnd, schoolId) {
        this.weekStart = weekStart;
        this.weekEnd = weekEnd;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByWeekQuery = GetCoursByWeekQuery;
class GetCoursByProfesseurAndDayQuery {
    constructor(professeurId, day, schoolId) {
        this.professeurId = professeurId;
        this.day = day;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByProfesseurAndDayQuery = GetCoursByProfesseurAndDayQuery;
class GetCoursByProfesseurAndWeekQuery {
    constructor(professeurId, weekStart, weekEnd, schoolId) {
        this.professeurId = professeurId;
        this.weekStart = weekStart;
        this.weekEnd = weekEnd;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByProfesseurAndWeekQuery = GetCoursByProfesseurAndWeekQuery;
class GetCoursByClasseAndDayQuery {
    constructor(classeId, day, schoolId) {
        this.classeId = classeId;
        this.day = day;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByClasseAndDayQuery = GetCoursByClasseAndDayQuery;
class GetCoursByClasseAndWeekQuery {
    constructor(classeId, weekStart, weekEnd, schoolId) {
        this.classeId = classeId;
        this.weekStart = weekStart;
        this.weekEnd = weekEnd;
        this.schoolId = schoolId;
    }
}
exports.GetCoursByClasseAndWeekQuery = GetCoursByClasseAndWeekQuery;
class GetAllDisciplinesQuery {
    constructor(schoolId) {
        this.schoolId = schoolId;
    }
}
exports.GetAllDisciplinesQuery = GetAllDisciplinesQuery;
class GetDisciplineByIdQuery {
    constructor(schoolId, id) {
        this.schoolId = schoolId;
        this.id = id;
    }
}
exports.GetDisciplineByIdQuery = GetDisciplineByIdQuery;
