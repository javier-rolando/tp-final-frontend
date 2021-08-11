import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  public usuario: Usuario;
  @Output() sidenavClose = new EventEmitter();

  constructor(private usuariosService: UsuariosService) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {}

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  closeSidenavAndLogout() {
    this.sidenavClose.emit();
    this.usuariosService.logout();
  }
}
