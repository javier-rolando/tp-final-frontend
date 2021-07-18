import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  public usuario: Usuario;
  public avatarUrl: string;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private imagenPipe: ImagenPipe
  ) {
    this.usuario = usuariosService.usuario;
    this.avatarUrl = this.imagenPipe.transform(
      this.usuario.avatar,
      this.usuario._id,
      'avatar'
    );
  }

  ngOnInit(): void {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.usuariosService.logout();
  }
}
