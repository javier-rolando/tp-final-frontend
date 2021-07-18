import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  public avatarUrl: string;

  constructor(private imagenPipe: ImagenPipe) {}

  ngOnInit(): void {
    this.avatarUrl = this.imagenPipe.transform(
      this.post.usuario.avatar,
      this.post.usuario._id,
      'avatar'
    );
  }
}
