import { Usuario } from '../models/usuario.model';

export interface GetUsuario {
  estado: string;
  usuario: Usuario;
}

export interface GetUsuarios {
  estado: string;
  total: number;
  usuarios: Usuario[];
}
