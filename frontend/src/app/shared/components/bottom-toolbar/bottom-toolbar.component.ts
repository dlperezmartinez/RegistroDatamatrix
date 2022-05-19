import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class BottomToolbarComponent implements OnInit, OnChanges {
  
  @Input() editando             : boolean  = false;
  @Input() insertandoNuevo      : boolean  = false;
  @Input() visualizandoArticulo : boolean  = false;
  @Input() articuloSeleccionadoB: boolean  = false;
  @Input() articuloSeleccionado : Articulo = new Articulo(); //TODO: Probablemente solo necesite un boolean.
  
  @Output() eliminarArticuloDialog        = new EventEmitter<void>();
  @Output() generarDataMatrixEmitter      = new EventEmitter<void>();

  @Output() vistaArticuloEmitter = new EventEmitter<string>();
  
  
  @Input() editar: boolean = false;
  @Input() nuevo: boolean = false;
  @Input() ver: boolean = false;

  @Input() formularioValido: boolean = false;
  
  botonEditar : string   = "";//this.editar ? "Cancelar" : "Editar";

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.botonEditar = this.editar ? "Cancelar" : "Editar";
  }

  ngOnInit(): void {
  }

  botonEditarFunciones() {
    if ( !this.editar ) this.vistaArticuloEmitter.emit('EDITAR');
    else this.vistaArticuloEmitter.emit('ATRAS')
  }
}
