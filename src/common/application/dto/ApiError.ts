import { StatusCode } from "./StatusCode";

export interface ApiError {
  statusCode: StatusCode;
  reason: string;
}
