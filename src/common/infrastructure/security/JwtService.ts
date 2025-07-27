import { IJwtService } from "../../../common/domain/contracts/IJwtService";
import jwt from "jsonwebtoken";

const secret: string = "supersecretkey123!@#456";

export const jwtService: IJwtService = {
  sign(payload: object): string {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  },

  verify(token: string): any {
    return jwt.verify(token, secret);
  },
};
