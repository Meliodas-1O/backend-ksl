export class Parent {
  constructor(
    public id: string,
    public lastName: string, // Nom
    public firstName: string, // Prenom
    public email: string,
    public phoneNumber: string,
    public address: string,
    public occupation: string,
    public childrenIds: string[] = []
  ) {}
}
