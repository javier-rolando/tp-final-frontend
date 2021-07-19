import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  public selectedValue: string;
  public imagenTemp: string;
  public usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private postsService: PostsService,
    private usuariosService: UsuariosService
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {}

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
    { value: 'Ciencia y educación', viewValue: 'Ciencia y educación' },
    { value: 'Entretenimiento', viewValue: 'Entretenimiento' },
    { value: 'Offtopic', viewValue: 'Offtopic' },
  ];

  subirImagen(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    // this.imagenSubir = input.files[0];
    this.fileUploadService
      .subirImagen(input.files[0], 'post')
      ?.subscribe((resp) => {
        this.imagenTemp = resp;
      });
  }

  crearPost() {
    // console.log(this.createPostForm.value);
    if (this.createPostForm.invalid) {
      return;
    }

    this.postsService.crearPost(this.createPostForm.value).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
