import { IJwtService } from "../../core/interfaces/IJwtService";
import jwt from "jsonwebtoken";

export class JwtService implements IJwtService {
  private secret = "supersecretkey123!@#456";

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}

export const jwtService = new JwtService();
