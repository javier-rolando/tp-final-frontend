import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private titleService: Title,
    private usuariosService: UsuariosService
  ) {
    this.titleService.setTitle('Postinger! | Confirmación de email');
  }

  ngOnInit(): void {}

  enviarEmail() {
    this.usuariosService.resendEmail().subscribe((resp) => {
      console.log(resp);
    });
  }
}
