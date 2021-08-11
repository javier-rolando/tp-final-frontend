import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrarDialogComponent } from 'src/app/components/borrar-dialog/borrar-dialog.component';
import { ChangePassComponent } from 'src/app/components/change-pass/change-pass.component';
import { ErrorResp } from 'src/app/interfaces/error.interface';
import { UpdateUserForm } from 'src/app/interfaces/update-user-form.interface';
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
  public usuarioPerfil: Usuario;
  public opcionesForm: FormGroup;
  public imagenTemp: string;
  public userId: string;
  public cargando: boolean = true;
  public cargandoImagen: boolean = false;
  private imagenSaved: boolean = false;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.usuario = usuariosService.usuario;
    this.titleService.setTitle('Postinger! | Opciones');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.userId = id;
      this.cargarUsuario(id);
    });

    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    if (this.imagenTemp && !this.imagenSaved) {
      this.fileUploadService
        .borrarImagenTemp(this.usuarioPerfil._id, 'avatar', this.imagenTemp)
        .subscribe(
          (resp) => {},
          (err) => {
            console.log(err);
          }
        );
    }
  }

  cargarUsuario(id: string) {
    this.cargando = true;
    this.usuariosService.getUsuario(id).subscribe(
      (usuario) => {
        this.usuarioPerfil = usuario;

        this.opcionesForm = this.fb.group({
          nombre: [
            this.usuarioPerfil.nombre,
            [
              Validators.required,
              Validators.pattern(/^([A-Z]|[a-z])+$/),
              Validators.minLength(3),
              Validators.maxLength(30),
            ],
          ],
          email: [
            this.usuarioPerfil.email,
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(100),
            ],
          ],
        });

        this.cargando = false;
      },
      (err: ErrorResp) => {
        if (err.status === 404) {
          this.router.navigateByUrl('/notfound', { skipLocationChange: true });
        } else {
          if (typeof err.error.mensaje === 'string') {
            this.openSnackBar(err.error.mensaje, 'Aceptar');
          } else {
            this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
            console.log(err);
          }
        }
        this.cargando = false;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  subirImagen(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.cargandoImagen = true;

    this.fileUploadService
      .subirImagen(this.usuarioPerfil._id, input.files[0], 'avatar')
      ?.subscribe(
        (archivo) => {
          this.imagenTemp = archivo;
          this.cargandoImagen = false;
        },
        (err: ErrorResp) => {
          if (typeof err.error.mensaje === 'string') {
            this.openSnackBar(err.error.mensaje, 'Aceptar');
          } else {
            this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
            console.log(err);
          }
          this.cargandoImagen = false;
        }
      );
  }

  actualizarUsuario() {
    if (this.opcionesForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(BorrarDialogComponent, {
      width: '500px',
      data: {
        action: 'actualizar',
        target: 'perfil',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const body: UpdateUserForm = this.opcionesForm.value;

        body.role = this.usuarioPerfil.role;

        if (this.imagenTemp) {
          body.avatar = this.imagenTemp;
        }

        this.usuariosService.actualizarUsuario(this.userId, body).subscribe(
          (resp) => {
            if (this.userId === this.usuario._id) {
              this.usuario.nombre = body.nombre;
              this.usuario.email = body.email;

              if (body.avatar) {
                this.usuario.avatar = body.avatar;
                this.imagenSaved = true;
              }
            } else {
              if (body.avatar) {
                this.imagenSaved = true;
              }
            }

            this.router.navigate(['/perfil', this.userId]);
            this.openSnackBar(resp.mensaje, 'Aceptar');
          },
          (err: ErrorResp) => {
            if (typeof err.error.mensaje === 'string') {
              this.openSnackBar(err.error.mensaje, 'Aceptar');
            } else {
              this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
              console.log(err);
            }
          }
        );
      }
    });
  }

  campoNoValido(campo: string): boolean {
    if (this.opcionesForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'nombre':
        if (this.opcionesForm.get('nombre')?.hasError('required')) {
          return 'El nombre es obligatorio';
        } else if (this.opcionesForm.get('nombre')?.hasError('pattern')) {
          return 'No se permiten caracteres especiales';
        } else if (this.opcionesForm.get('nombre')?.hasError('minlength')) {
          return 'El nombre debe tener al menos 3 caracteres';
        } else if (this.opcionesForm.get('nombre')?.hasError('maxlength')) {
          return 'El nombre no debe tener más de 30 caracteres';
        }
        break;
      case 'email':
        if (this.opcionesForm.get('email')?.hasError('required')) {
          return 'El email es obligatorio';
        } else if (this.opcionesForm.get('email')?.hasError('email')) {
          return 'El email es inválido';
        } else if (this.opcionesForm.get('email')?.hasError('minlength')) {
          return 'El email debe tener al menos 6 caracteres';
        } else if (this.opcionesForm.get('email')?.hasError('maxlength')) {
          return 'El email no debe tener más de 100 caracteres';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
  }

  abrirDialog() {
    this.dialog.open(ChangePassComponent, {
      width: '400px',
      data: { userId: this.userId },
    });
  }
}
