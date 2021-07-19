import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(
    img: string,
    userId: string,
    folder: 'post' | 'temp' | 'avatar',
    tempFolder?: 'post' | 'avatar'
  ): string {
    if (folder === 'temp' && tempFolder) {
      return `${base_url}/uploads/${userId}/${folder}/${img}?folder=${tempFolder}`;
    }
    return `${base_url}/uploads/${userId}/${folder}/${img}`;
  }
}
