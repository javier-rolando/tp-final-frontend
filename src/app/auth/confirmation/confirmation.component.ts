import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {}

  enviarEmail() {
    this.usuariosService.resendEmail().subscribe((resp) => {
      console.log(resp);
    });
  }
}
