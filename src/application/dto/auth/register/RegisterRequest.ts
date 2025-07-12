import { ApiError } from "../../../../application/dto/error/ApiError";
import { StatusCode } from "../../../../application/dto/error/StatusCode";
import { Role } from "../../../../core/entitites/Role";

interface RegisterRequest {
  email: string;
  password: string;
  role: Role;

  // TODO add roles

  // Classes : Niveau --- Nom
  //            6e         A
}

export function createRegisterRequest(bodyRequest: any): RegisterRequest {
  // Return RegisterRequest if all checks pass
  const registerRequest: RegisterRequest = {
    email: bodyRequest.email,
    password: bodyRequest.password,
    role: bodyRequest.role,
  };

  return registerRequest;
}

export function validateBodyRequest(bodyRequest: any): ApiError | null {
  // Check if all required fields exist
  if (!bodyRequest.email || !bodyRequest.password || !bodyRequest.role) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Fields 'email', 'password', and 'role' are required.",
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(bodyRequest.email)) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Invalid email format.",
    };
  }

  // Validate password strength (example: min length 8 characters)
  if (bodyRequest.password.length < 8) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Password must be at least 8 characters long.",
    };
  }

  // Validate role enum value
  if (!(Object.values(Role) as string[]).includes(bodyRequest.role)) {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: `Invalid role. Valid roles are: ${Object.values(Role).join(
        ", "
      )}.`,
    };
  }
  return null;
}
