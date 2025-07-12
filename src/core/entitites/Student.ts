export class Student {
  constructor(
    public readonly id: string,
    public name: string,
    public dateOfBirth: string,
    public studentClass: string,
    public photo: string | null,
    public average: number,
    public absences: number,
    public delays: number
  ) {}
}
