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

export interface CreateUsuario {
  estado: string;
  usuarioCreado: Usuario;
  token: string;
}

export interface ValidarUsuario {
  estado: string;
  usuario: Usuario;
}

export interface Login {
  estado: string;
  mensaje: string;
  token: string;
}

export interface RenewToken {
  token: string;
}

export interface ResendEmail {
  estado: string;
  mensaje: string;
}

export interface UpdateUsuario {
  estado: string;
  mensaje: string;
  usuarioActualizado: Usuario;
}

export interface ChangePass {
  estado: string;
  mensaje: string;
}

export interface DeleteUsuario {
  estado: string;
  mensaje: string;
}
