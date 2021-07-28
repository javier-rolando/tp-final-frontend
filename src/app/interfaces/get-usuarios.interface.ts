import { Usuario } from '../models/usuario.model';

export interface GetUsuarios {
  estado: string;
  total: number;
  usuarios: Usuario[];
}
