export class Teacher {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public address: string,
    public biography: string,
    public subject?: string,
    public classroomIds: string[] = []
  ) {}
}
