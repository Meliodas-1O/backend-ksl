import { ApiError } from "../../../../common/application/dto/ApiError";
import { StatusCode } from "../../../../common/application/dto/StatusCode";

export interface ResetPasswordRequest {
  schoolName: string;
  newPassword: string;
  oldPassword: string;
  email: string;
}
export function resetPasswordRequestValidator(
  data: Partial<ResetPasswordRequest>
): ApiError | null {
  if (!data.email || typeof data.email !== "string") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Email is required and must be a string.",
    };
  }

  if (!data.oldPassword || typeof data.oldPassword !== "string") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "Old password is required and must be a string.",
    };
  }

  if (!data.newPassword || typeof data.newPassword !== "string") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "New password is required and must be a string.",
    };
  }

  if (!data.schoolName || typeof data.schoolName !== "string") {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      reason: "School ID is required and must be a string.",
    };
  }

  return null;
}
