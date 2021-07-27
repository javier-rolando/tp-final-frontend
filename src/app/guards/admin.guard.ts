import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.usuariosService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
