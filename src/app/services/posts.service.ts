import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreatePostForm } from '../interfaces/create-post-form.interface';
import { GetPosts } from '../interfaces/get-posts.interface';
import { Post } from '../models/post.model';

const base_url = environment.base_url;

interface RespPosts {
  estado: string;
  posts: Post[];
}

interface RespPost {
  estado: string;
  post: Post;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  crearPost(formData: CreatePostForm) {
    return this.http.post(`${base_url}/posts/create`, formData);
  }

  cargarPostPorId(id: string) {
    return this.http
      .get<RespPost>(`${base_url}/posts/${id}`)
      .pipe(map((resp: RespPost) => resp.post));
  }

  cargarPosts() {
    return this.http.get<GetPosts>(`${base_url}/posts`);
  }

  cargarPostsPorCategoria(categoria: string) {
    return this.http
      .get<RespPosts>(`${base_url}/posts?categoria=${categoria}`)
      .pipe(map((resp: RespPosts) => resp.posts));
  }

  cargarPostsPorUsuario(id: string) {
    return this.http
      .get<RespPosts>(`${base_url}/posts/user/${id}`)
      .pipe(map((resp: RespPosts) => resp.posts));
  }

  actualizarPost(id: string, formData: any) {
    return this.http.put(`${base_url}/posts/${id}`, formData);
  }

  borrarPost(id: string) {
    return this.http.delete(`${base_url}/posts/${id}`);
  }

  likePost(id: string) {
    return this.http.post(`${base_url}/posts/like/${id}`, {});
  }

  dislikePost(id: string) {
    return this.http.post(`${base_url}/posts/dislike/${id}`, {});
  }
}
