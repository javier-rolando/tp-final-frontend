import { Usuario } from './usuario.model';

export class Post {
  constructor(
    public usuario: Usuario,
    public imagen: string,
    public titulo: string,
    public contenido: string,
    public categoria: string,
    public valoracion: boolean,
    public _id: string,
    public createdAt: Date
  ) {}
}
