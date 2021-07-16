import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
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

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  categorias: Categoria[] = [
    { value: 'humor-0', viewValue: 'Humor' },
    { value: 'deportes-1', viewValue: 'Deportes' },
    { value: 'info-2', viewValue: 'Info' },
    { value: 'cienciayed-3', viewValue: 'Ciencia y educación' },
    { value: 'entretenimiento-4', viewValue: 'Entretenimiento' },
    { value: 'offtopic-5', viewValue: 'Offtopic' },
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
}
