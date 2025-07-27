import { Role } from "common/application/dto/Role";

export class RegisterCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly roles: Role[],
    public nom: string,
    public prenom: string,
    public readonly schoolId: string,
    public telephone: string | null,
    public profession: string | null
  ) {}
}
