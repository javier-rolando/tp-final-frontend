import { Usuario } from './usuario.model';

export class Post {
  constructor(
    public usuario: Usuario,
    public imagen: string,
    public titulo: string,
    public contenido: string,
    public categoria: string,
    public likes: number,
    public likedBy: string[],
    public dislikes: number,
    public dislikedBy: string[],
    public _id: string,
    public createdAt: Date
  ) {}
}
