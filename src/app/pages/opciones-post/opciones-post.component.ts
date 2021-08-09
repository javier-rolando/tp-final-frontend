import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrarDialogComponent } from 'src/app/components/borrar-dialog/borrar-dialog.component';
import { Post } from 'src/app/models/post.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-opciones-post',
  templateUrl: './opciones-post.component.html',
  styleUrls: ['./opciones-post.component.css'],
})
export class OpcionesPostComponent implements OnInit, OnDestroy {
  public selectedValue: string;
  public opcionesPostForm: FormGroup;
  public usuarioID: string;
  public usuarioRole: 'ADMIN_ROLE' | 'USER_ROLE';
  public post: Post;
  public imagenTemp: string;
  private imagenSaved: boolean = false;
  private postId: string;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private postsService: PostsService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Postinger! | Opciones del post');
    this.usuarioID = usuariosService.usuario._id;
    this.usuarioRole = usuariosService.role;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.postId = id;
      this.cargarPost(id);
    });
  }

  ngOnDestroy(): void {
    if (this.imagenTemp && !this.imagenSaved) {
      this.fileUploadService
        .borrarImagenTemp(this.post.usuario._id, 'post', this.imagenTemp)
        .subscribe(
          (resp) => {},
          (err) => {
            console.log(err);
          }
        );
    }
  }

  categorias: Categoria[] = [
    { value: 'Humor', viewValue: 'Humor' },
    { value: 'Deportes', viewValue: 'Deportes' },
    { value: 'Info', viewValue: 'Info' },
    { value: 'Ciencia y educación', viewValue: 'Ciencia y educación' },
    { value: 'Entretenimiento', viewValue: 'Entretenimiento' },
    { value: 'Offtopic', viewValue: 'Offtopic' },
  ];

  cargarPost(id: string) {
    this.postsService.cargarPostPorId(id).subscribe(
      (post) => {
        this.post = post;

        this.selectedValue = this.post.categoria;

        this.opcionesPostForm = this.fb.group({
          titulo: [
            this.post.titulo,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(50),
            ],
          ],
          contenido: [
            this.post.contenido,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(500),
            ],
          ],
          categoria: [this.post.categoria, Validators.required],
        });
      },
      (err) => {
        if (err.status === 404) {
          this.router.navigateByUrl('/notfound', { skipLocationChange: true });
        } else {
          console.log(err);
        }
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

    this.fileUploadService
      .subirImagen(this.post.usuario._id, input.files[0], 'post')
      ?.subscribe((resp) => {
        this.imagenTemp = resp;
      });
  }

  actualizarPost() {
    if (this.opcionesPostForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(BorrarDialogComponent, {
      width: '500px',
      data: {
        action: 'actualizar',
        target: 'post',
        info: 'Si editas el post se borrarán todos los likes y dislikes',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const body = this.opcionesPostForm.value;

        if (this.imagenTemp) {
          body.imagen = this.imagenTemp;
        }

        this.postsService.actualizarPost(this.postId, body).subscribe(
          (resp: any) => {
            if (body.imagen) {
              this.imagenSaved = true;
            }
            this.openSnackBar(resp.mensaje, 'Aceptar');
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  borrarPost() {
    const dialogRef = this.dialog.open(BorrarDialogComponent, {
      width: '500px',
      data: { action: 'borrar', target: 'post' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postsService.borrarPost(this.postId).subscribe(
          (resp: any) => {
            this.router.navigateByUrl('/');
            this.openSnackBar(resp.mensaje, 'Aceptar');
          },
          (err) => {
            this.openSnackBar(err.error.mensaje, 'Aceptar');
          }
        );
      }
    });
  }

  campoNoValido(campo: string): boolean {
    if (this.opcionesPostForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'titulo':
        if (this.opcionesPostForm.get('titulo')?.hasError('required')) {
          return 'El título es obligatorio';
        } else if (this.opcionesPostForm.get('titulo')?.hasError('minlength')) {
          return 'El título debe tener al menos 5 caracteres';
        } else if (this.opcionesPostForm.get('titulo')?.hasError('maxlength')) {
          return 'El título no debe tener más de 50 caracteres';
        }
        break;
      case 'contenido':
        if (this.opcionesPostForm.get('contenido')?.hasError('required')) {
          return 'El contenido es obligatorio';
        } else if (
          this.opcionesPostForm.get('contenido')?.hasError('minlength')
        ) {
          return 'El contenido debe tener al menos 5 caracteres';
        } else if (
          this.opcionesPostForm.get('contenido')?.hasError('maxlength')
        ) {
          return 'El contenido no debe tener más de 500 caracteres';
        }
        break;
      case 'categoria':
        if (this.opcionesPostForm.get('categoria')?.hasError('required')) {
          return 'La categoría es obligatoria';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
  }
}
