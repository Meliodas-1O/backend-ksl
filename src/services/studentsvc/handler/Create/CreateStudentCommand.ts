export class CreateStudentCommand {
  constructor(
    public nom: string,
    public prenom: string,
    public dateOfBirth: Date,
    public schoolId: string,
    public classe: string
  ) {}
}
