export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public role: 'USER_ROLE' | 'ADMIN_ROLE',
    public confirmado: boolean,
    public _id: string,
    public avatar: string,
    public createdAt: Date,
    public password?: string
  ) {}
}
