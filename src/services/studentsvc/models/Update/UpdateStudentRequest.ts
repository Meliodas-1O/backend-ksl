import { ApiError } from "../../../../common/application/dto/ApiError";
import { StatusCode } from "../../../../common/application/dto/StatusCode";

export interface UpdateStudentRequest {
  nom: string;
  prenom: string;
  dateOfBirth: string;
  abscence: number;
  retards: number;
  moyenne: number;
}

export function validateStudentData(data: any): ApiError | null {
  // Validate nom
  if (typeof data.nom !== "string" || data.nom.trim() === "") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Invalid 'nom'. Must be a non-empty string.",
    };
  }

  // Validate prenom
  if (typeof data.prenom !== "string" || data.prenom.trim() === "") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Invalid 'prenom'. Must be a non-empty string.",
    };
  }

  // Validate dateOfBirth
  const dob = new Date(data.dateOfBirth);
  const now = new Date();
  const minBirthDate = new Date();
  minBirthDate.setFullYear(now.getFullYear() - 3); // Person must be at least 3 years old

  if (isNaN(dob.getTime())) {
    // Check if date is valid
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Invalid 'dateOfBirth'. Must be a valid date string.",
    };
  }
  if (dob > now) {
    // Date of birth cannot be in the future
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "'dateOfBirth' cannot be in the future.",
    };
  }
  if (dob > minBirthDate) {
    // Enforce minimum age (e.g., 3 years old)
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "'dateOfBirth' indicates the person is too young. Must be at least 3 years old.",
    };
  }

  // Validate abscence
  if (typeof data.abscence !== "number" || !Number.isInteger(data.abscence) || data.abscence < 0) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Invalid 'abscence'. Must be a non-negative integer.",
    };
  }

  // Validate retards
  if (typeof data.retards !== "number" || !Number.isInteger(data.retards) || data.retards < 0) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Invalid 'retards'. Must be a non-negative integer.",
    };
  }

  // Validate moyenne
  if (typeof data.moyenne !== "number" || data.moyenne < 0 || data.moyenne > 20) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Invalid 'moyenne'. Must be a number between 0 and 20.",
    };
  }

  // If all checks pass, return null
  return null;
}
