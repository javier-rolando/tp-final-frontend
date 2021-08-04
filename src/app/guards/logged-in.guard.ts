import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  canActivate(): any {
    return this.usuariosService.getUsuario().pipe(
      take(1),
      map((estaAutenticado) => {
        if (estaAutenticado) {
          this.router.navigateByUrl('/');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
