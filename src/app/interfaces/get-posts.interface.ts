import { Post } from '../models/post.model';

export interface GetPosts {
  estado: string;
  posts: Post[];
  total: number;
}
