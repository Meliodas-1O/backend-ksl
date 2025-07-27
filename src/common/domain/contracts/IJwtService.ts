export interface IJwtService {
  sign(payload: object, options?: JwtSignOptions): string;
  verify<T = any>(token: string): T;
}

export type JwtSignOptions = {
  expiresIn?: string | number; // e.g., '1h' or 3600
  subject?: string;
  issuer?: string;
  audience?: string;
};
