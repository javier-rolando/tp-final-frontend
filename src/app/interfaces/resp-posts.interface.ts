import { Post } from '../models/post.model';

export interface CreatePost {
  estado: string;
  mensaje: string;
  postCreado: Post;
}

export interface GetPostID {
  estado: string;
  post: Post;
}

export interface GetPosts {
  estado: string;
  posts: Post[];
  total: number;
}

export interface GetPostUser {
  estado: string;
  posts: Post[];
  total: number;
}

export interface UpdatePost {
  estado: string;
  mensaje: string;
  postActualizado: Post;
}

export interface DeletePost {
  estado: string;
  mensaje: string;
}

export interface LikePost {
  estado: string;
  mensaje: string;
  likes: number;
  likedBy: string[];
  dislikes: number;
  dislikedBy: string[];
}

export interface DislikePost {
  estado: string;
  mensaje: string;
  likes: number;
  likedBy: string[];
  dislikes: number;
  dislikedBy: string[];
}
