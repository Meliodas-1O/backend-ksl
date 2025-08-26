"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDisciplineByIdQueryHandler = exports.GetAllDisciplinesQueryHandler = exports.GetCoursByClasseAndWeekQueryHandler = exports.GetCoursByClasseAndDayQueryHandler = exports.GetCoursByProfesseurAndWeekQueryHandler = exports.GetCoursByProfesseurAndDayQueryHandler = exports.GetCoursByWeekQueryHandler = exports.GetCoursByDayAndHourQueryHandler = exports.GetCoursByDayQueryHandler = exports.GetCoursByClasseQueryHandler = exports.GetCoursByProfesseurQueryHandler = exports.GetCoursByIdQueryHandler = exports.GetAllCoursQueryHandler = exports.AssignMatiereToCoursCommandHandler = exports.AssignProfesseurToCoursCommandHandler = exports.DeleteCoursCommandHandler = exports.UpdateCoursCommandHandler = exports.CreateCoursCommandHandler = void 0;
const Cours_1 = require("../../common/domain/entities/Cours");
class CreateCoursCommandHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const cours = Cours_1.Cours.createCours(command.jour, command.heure, command.disciplineId, command.professeurId, command.classeId, command.schoolId);
            return this.coursRepository.create(cours);
        });
    }
}
exports.CreateCoursCommandHandler = CreateCoursCommandHandler;
class UpdateCoursCommandHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const cours = Cours_1.Cours.createCours(command.jour, command.heure, command.disciplineId, command.professeurId, command.classeId, command.schoolId);
            return this.coursRepository.update(command.coursId, cours);
        });
    }
}
exports.UpdateCoursCommandHandler = UpdateCoursCommandHandler;
class DeleteCoursCommandHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.delete(command.coursId);
        });
    }
}
exports.DeleteCoursCommandHandler = DeleteCoursCommandHandler;
class AssignProfesseurToCoursCommandHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.assignProfesseur(command.coursId, command.professeurId, command.schoolId);
        });
    }
}
exports.AssignProfesseurToCoursCommandHandler = AssignProfesseurToCoursCommandHandler;
class AssignMatiereToCoursCommandHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.assignMatiere(command.coursId, command.matiereId, command.schoolId);
        });
    }
}
exports.AssignMatiereToCoursCommandHandler = AssignMatiereToCoursCommandHandler;
class GetAllCoursQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findAll(query.schoolId);
        });
    }
}
exports.GetAllCoursQueryHandler = GetAllCoursQueryHandler;
class GetCoursByIdQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findById(query.coursId, query.schoolId);
        });
    }
}
exports.GetCoursByIdQueryHandler = GetCoursByIdQueryHandler;
class GetCoursByProfesseurQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByProfesseur(query.professeurId, query.schoolId);
        });
    }
}
exports.GetCoursByProfesseurQueryHandler = GetCoursByProfesseurQueryHandler;
class GetCoursByClasseQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByClasse(query.classeId, query.schoolId);
        });
    }
}
exports.GetCoursByClasseQueryHandler = GetCoursByClasseQueryHandler;
class GetCoursByDayQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByDay(query.day, query.schoolId);
        });
    }
}
exports.GetCoursByDayQueryHandler = GetCoursByDayQueryHandler;
class GetCoursByDayAndHourQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByDayAndHour(query.day, query.hour, query.schoolId);
        });
    }
}
exports.GetCoursByDayAndHourQueryHandler = GetCoursByDayAndHourQueryHandler;
class GetCoursByWeekQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByWeek(query.weekStart, query.weekEnd, query.schoolId);
        });
    }
}
exports.GetCoursByWeekQueryHandler = GetCoursByWeekQueryHandler;
class GetCoursByProfesseurAndDayQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByProfesseurAndDay(query.professeurId, query.day, query.schoolId);
        });
    }
}
exports.GetCoursByProfesseurAndDayQueryHandler = GetCoursByProfesseurAndDayQueryHandler;
class GetCoursByProfesseurAndWeekQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByProfesseurAndWeek(query.professeurId, query.weekStart, query.weekEnd, query.schoolId);
        });
    }
}
exports.GetCoursByProfesseurAndWeekQueryHandler = GetCoursByProfesseurAndWeekQueryHandler;
class GetCoursByClasseAndDayQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByClasseAndDay(query.classeId, query.day, query.schoolId);
        });
    }
}
exports.GetCoursByClasseAndDayQueryHandler = GetCoursByClasseAndDayQueryHandler;
class GetCoursByClasseAndWeekQueryHandler {
    constructor(coursRepository) {
        this.coursRepository = coursRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.coursRepository.findByClasseAndWeek(query.classeId, query.weekStart, query.weekEnd, query.schoolId);
        });
    }
}
exports.GetCoursByClasseAndWeekQueryHandler = GetCoursByClasseAndWeekQueryHandler;
class GetAllDisciplinesQueryHandler {
    constructor(disciplineRepository) {
        this.disciplineRepository = disciplineRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.disciplineRepository.findAllDisplines(query.schoolId);
        });
    }
}
exports.GetAllDisciplinesQueryHandler = GetAllDisciplinesQueryHandler;
class GetDisciplineByIdQueryHandler {
    constructor(disciplineRepository) {
        this.disciplineRepository = disciplineRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.disciplineRepository.findDisciplineById(query.id, query.schoolId);
        });
    }
}
exports.GetDisciplineByIdQueryHandler = GetDisciplineByIdQueryHandler;
