import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo } from 'src/app/db/articulo';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styles: [`
    .cabecera-lista {
      background: lightgrey;
      border-radius: 10px 10px 0 0;

      text-align: center;
      color: black;
    }
    .elementos-lista {
      text-align: center;
    }
  `
  ]
})
export class ListaArticulosComponent implements OnInit {

  @Input() articulos        : Articulo[] = [];
  @Input() ultimasRevisiones: Date    [] = [];

  @Output() elementoSeleccionado               = new EventEmitter<Articulo>();
  @Output() resetLista                         = new EventEmitter<void>();

  @Output() vistaArticuloEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.resetLista.emit();
  }
}
