import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  @Output() categoria = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  enviarCategoria(categoria: string) {
    this.categoria.emit(categoria);
  }
}
