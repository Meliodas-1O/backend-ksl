export class CreateStudentCommand {
  public parentId: string | null = null;
  constructor(
    public nom: string,
    public prenom: string,
    public dateOfBirth: Date,
    public schoolId: string,
    public classe: string
  ) {}
}
