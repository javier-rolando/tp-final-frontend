export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public confirmado?: boolean,
    public avatar?: string,
    public createdAt?: Date,
    public role?: string,
    public _id?: string
  ) {}
}
