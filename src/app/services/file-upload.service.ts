import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  subirImagen(archivo: File) {
    try {
      const url = `${base_url}/uploads`;
      const formData = new FormData();
      formData.append('img', archivo);

      return this.http
        .post(url, formData)
        .pipe(map((resp: any) => resp.archivo));
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
