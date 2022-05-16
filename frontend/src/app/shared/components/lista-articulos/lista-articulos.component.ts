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

  @Output() vistaArticulo        = new EventEmitter<boolean>();
  @Output() elementoSeleccionado = new EventEmitter<Articulo>();

  constructor() { }

  ngOnInit(): void {
  }
}
