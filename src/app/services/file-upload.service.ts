import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeleteImg, UploadImg } from '../interfaces/resp-uploads.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  subirImagen(userId: string, archivo: File, folder: string) {
    try {
      const url = `${base_url}/uploads/${userId}/${folder}`;
      const formData = new FormData();
      formData.append('img', archivo);

      return this.http
        .post<UploadImg>(url, formData)
        .pipe(map((resp) => resp.archivo));
    } catch (error) {
      console.log(error);
      return;
    }
  }

  borrarImagenTemp(userId: string, folder: string, nombre: string) {
    return this.http.delete<DeleteImg>(
      `${base_url}/uploads/${userId}/${folder}/${nombre}`
    );
  }
}
