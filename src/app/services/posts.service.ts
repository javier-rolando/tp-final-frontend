import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreatePostForm } from '../interfaces/create-post-form.interface';
import {
  CreatePost,
  DeletePost,
  DislikePost,
  GetPostID,
  GetPosts,
  GetPostUser,
  LikePost,
  UpdatePost,
} from '../interfaces/resp-posts.interface';
import { UpdatePostForm } from '../interfaces/update-post-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  crearPost(formData: CreatePostForm) {
    return this.http.post<CreatePost>(`${base_url}/posts/create`, formData);
  }

  cargarPostPorId(id: string) {
    return this.http
      .get<GetPostID>(`${base_url}/posts/${id}`)
      .pipe(map((resp) => resp.post));
  }

  cargarPosts() {
    return this.http.get<GetPosts>(`${base_url}/posts`);
  }

  // cargarPostsPorCategoria(categoria: string) {
  //   return this.http
  //     .get(`${base_url}/posts?categoria=${categoria}`)
  //     .pipe(map((resp: any) => resp.posts));
  // }

  cargarPostsPorUsuario(id: string) {
    return this.http
      .get<GetPostUser>(`${base_url}/posts/user/${id}`)
      .pipe(map((resp) => resp.posts));
  }

  actualizarPost(id: string, formData: UpdatePostForm) {
    return this.http.put<UpdatePost>(`${base_url}/posts/${id}`, formData);
  }

  borrarPost(id: string) {
    return this.http.delete<DeletePost>(`${base_url}/posts/${id}`);
  }

  likePost(id: string) {
    return this.http.post<LikePost>(`${base_url}/posts/like/${id}`, {});
  }

  dislikePost(id: string) {
    return this.http.post<DislikePost>(`${base_url}/posts/dislike/${id}`, {});
  }
}
