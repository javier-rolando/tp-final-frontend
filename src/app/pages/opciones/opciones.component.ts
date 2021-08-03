import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePassComponent } from 'src/app/components/change-pass/change-pass.component';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css'],
})
export class OpcionesComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public opcionesForm: FormGroup;
  public imagenTemp: string;
  private imagenSaved: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private fileUploadService: FileUploadService,
    public dialog: MatDialog
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {
    this.opcionesForm = this.fb.group({
      nombre: [
        this.usuario.nombre,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      email: [
        this.usuario.email,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnDestroy(): void {
    if (this.imagenTemp && !this.imagenSaved) {
      this.fileUploadService
        .borrarImagenTemp(this.usuario._id, 'avatar', this.imagenTemp)
        .subscribe(
          (resp) => {},
          (err) => {
            console.log(err);
          }
        );
    }
  }

  subirImagen(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.fileUploadService
      .subirImagen(input.files[0], 'avatar')
      ?.subscribe((resp) => {
        this.imagenTemp = resp;
      });
  }

  actualizarUsuario() {
    if (this.opcionesForm.invalid) {
      return;
    }

    const body = this.opcionesForm.value;

    body.role = this.usuario.role;

    if (this.imagenTemp) {
      body.avatar = this.imagenTemp;
    }

    this.usuariosService.actualizarUsuario(body).subscribe(
      (resp) => {
        this.usuario.nombre = body.nombre;
        this.usuario.email = body.email;
        if (body.avatar) {
          this.imagenSaved = true;
          this.usuario.avatar = body.avatar;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  abrirDialog() {
    this.dialog.open(ChangePassComponent, {
      width: '400px',
    });
  }
}
