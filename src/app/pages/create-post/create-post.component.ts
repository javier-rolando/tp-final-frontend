import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreatePostForm } from 'src/app/interfaces/create-post-form.interface';
import { ErrorResp } from 'src/app/interfaces/error.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  public selectedValue: string;
  public imagenTemp: string;
  public usuario: Usuario;
  private imagenExists: boolean = false;
  private imagenSaved: boolean = false;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private postsService: PostsService,
    private usuariosService: UsuariosService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = usuariosService.usuario;
    this.titleService.setTitle('Postinger! | Crear post');
  }

  ngOnInit(): void {
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    if (this.imagenTemp && !this.imagenSaved)
      this.fileUploadService
        .borrarImagenTemp(this.usuario._id, 'post', this.imagenTemp)
        .subscribe(
          (resp) => {},
          (err) => {
            console.log(err);
          }
        );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  public createPostForm = this.fb.group({
    titulo: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    contenido: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(500)],
    ],
    categoria: ['', Validators.required],
  });

  categorias: Categoria[] = [
    { value: 'Humor', viewValue: 'Humor' },
    { value: 'Deportes', viewValue: 'Deportes' },
    { value: 'Info', viewValue: 'Info' },
    { value: 'Ciencia y educaci??n', viewValue: 'Ciencia y educaci??n' },
    { value: 'Entretenimiento', viewValue: 'Entretenimiento' },
    { value: 'Offtopic', viewValue: 'Offtopic' },
  ];

  subirImagen(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.imagenExists = true;

    this.fileUploadService
      .subirImagen(this.usuario._id, input.files[0], 'post')
      ?.subscribe(
        (archivo) => {
          this.imagenTemp = archivo;
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

  crearPost() {
    if (this.createPostForm.invalid) {
      return;
    }

    if (!this.imagenExists) {
      this.openSnackBar('Falta elegir una imagen', 'Aceptar');
      return;
    }

    const body: CreatePostForm = this.createPostForm.value;

    this.postsService.crearPost(body).subscribe(
      (resp) => {
        this.imagenSaved = true;
        this.openSnackBar(resp.mensaje, 'Aceptar');
        this.router.navigateByUrl(`/post/${resp.postCreado._id}`);
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

  campoNoValido(campo: string): boolean {
    if (this.createPostForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'titulo':
        if (this.createPostForm.get('titulo')?.hasError('required')) {
          return 'El t??tulo es obligatorio';
        } else if (this.createPostForm.get('titulo')?.hasError('minlength')) {
          return 'El t??tulo debe tener al menos 5 caracteres';
        } else if (this.createPostForm.get('titulo')?.hasError('maxlength')) {
          return 'El t??tulo no debe tener m??s de 50 caracteres';
        }
        break;
      case 'contenido':
        if (this.createPostForm.get('contenido')?.hasError('required')) {
          return 'El contenido es obligatorio';
        } else if (
          this.createPostForm.get('contenido')?.hasError('minlength')
        ) {
          return 'El contenido debe tener al menos 5 caracteres';
        } else if (
          this.createPostForm.get('contenido')?.hasError('maxlength')
        ) {
          return 'El contenido no debe tener m??s de 500 caracteres';
        }
        break;
      case 'categoria':
        if (this.createPostForm.get('categoria')?.hasError('required')) {
          return 'La categor??a es obligatoria';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
  }
}
