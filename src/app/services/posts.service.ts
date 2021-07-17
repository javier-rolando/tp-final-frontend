import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreatePostForm } from '../interfaces/create-post-form.interface';
import { Post } from '../models/post.model';

const base_url = environment.base_url;

interface Resp {
  estado: string;
  posts: Post[];
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  crearPost(formData: CreatePostForm) {
    return this.http.post(`${base_url}/posts/create`, formData);
  }

  cargarPosts() {
    return this.http
      .get<Resp>(`${base_url}/posts`)
      .pipe(map((resp: Resp) => resp.posts));
  }
}
