import { Usuario } from '../models/usuario.model';

export interface GetUsuarios {
  total: number;
  usuarios: Usuario[];
}
