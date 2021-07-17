import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PostsService } from 'src/app/services/posts.service';
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
  public imagenTempUrl: string;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private postsService: PostsService
  ) {}

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
    { value: 'info-2', viewValue: 'Info' },
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
    this.fileUploadService.subirImagen(input.files[0])?.subscribe((resp) => {
      this.imagenTempUrl = `${base_url}/posts/uploads/${resp}`;
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
