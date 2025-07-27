import { StatusCode } from "../../../../common/application/dto/StatusCode";
import { ApiError } from "../../../../common/application/dto/ApiError";

export interface CreateStudentRequest {
  nom: string;
  prenom: string;
  dateOfBirth: Date;
  schoolId: string;
  classe: string;
}

export function validateCreateStudentRequest(request: any): null | ApiError {
  // Check if request is an object and not null/undefined
  if (typeof request !== "object" || request === null) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Request must be an object.",
    };
  }

  const { nom, prenom, dateOfBirth, schoolId, classe } = request;

  // Validate 'nom'
  if (typeof nom !== "string" || nom.trim() === "") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Nom is required and must be a non-empty string.",
    };
  }

  // Validate 'prenom'
  if (typeof prenom !== "string" || prenom.trim() === "") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Prenom is required and must be a non-empty string.",
    };
  }

  // Validate 'dateOfBirth'
  // Ensure it's an instance of Date and is not an "Invalid Date"
  if (!(dateOfBirth instanceof Date) || isNaN(dateOfBirth.getTime())) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "DateOfBirth is required and must be a valid Date object.",
    };
  }
  // Optional: Add a check for future dates if students cannot be born in the future
  // The current date is Tuesday, July 22, 2025
  const now = new Date();
  if (dateOfBirth > now) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "DateOfBirth cannot be in the future.",
    };
  }

  // Validate 'schoolId'
  if (typeof schoolId !== "string" || schoolId.trim() === "") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "schoolId is required and must be a non-empty string.",
    };
  }

  // Validate 'classe'
  if (typeof classe !== "string" || classe.trim() === "") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "classe is required and must be a non-empty string.",
    };
  }

  // If all validations pass
  return null;
}
