import { ApiError } from "../../../../common/application/dto/ApiError";
import { StatusCode } from "../../../../common/application/dto/StatusCode";

export interface LoginRequest {
  email: string;
  password: string;
  schoolName: string;
}

export function loginRequestValidator(data: Partial<LoginRequest>): ApiError | null {
  if (!data.email || typeof data.email !== "string") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Email is required and must be a string.",
    };
  }

  if (!data.password || typeof data.password !== "string") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Password is required and must be a string.",
    };
  }

  if (!data.schoolName || typeof data.schoolName !== "string") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "SchoolName is required and must be a string.",
    };
  }

  return null;
}
