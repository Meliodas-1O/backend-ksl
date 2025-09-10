import { ApiError } from "../../../../common/application/dto/ApiError";
import { StatusCode } from "../../../../common/application/dto/StatusCode";

export interface UpdateStudentRequest {
  nom: string;
  prenom: string;
  dateOfBirth: string;
  classeId?: string;
  parentId: string;
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

  // If all checks pass, return null
  return null;
}
