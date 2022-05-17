import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo } from 'src/app/db/articulo';

@Component({
  selector: 'app-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styles: [`
    mat-toolbar {
      position: fixed;
      bottom: 0;
    }
    button {
      margin: 8px;
    }
    .editar {
      background: #69f0ae;
    }
    .cancelar-edicion {
      background: #f44336;
    }
  `
  ]
})
export class BottomToolbarComponent implements OnInit {

  
  @Input() botonVerArticulo     : string   = "Ver artículo"; //TODO: Esta variable puede que no tenga que ser un input.
  @Input() editando             : boolean  = false;
  @Input() insertandoNuevo      : boolean  = false;
  @Input() visualizandoArticulo : boolean  = false;
  @Input() articuloSeleccionadoB: boolean  = false;
  @Input() articuloSeleccionado : Articulo = new Articulo(); //TODO: Probablemente solo necesite un boolean.
  
  @Output() eliminarArticuloDialog      = new EventEmitter<void>();
  @Output() visualizandoArticuloEmitter = new EventEmitter<boolean>();
  @Output() editandoEmitter             = new EventEmitter<boolean>();
  
  botonEditar         : string   = this.editando ? "Cancelar" : "Editar";; //TODO: Esta variable puede que no tenga que ser un input.

  constructor() { }

  ngOnInit(): void {
  }
}
