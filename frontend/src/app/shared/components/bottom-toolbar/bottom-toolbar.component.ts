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
    .nuevo {
      background: #69f0ae;
    }
    .cancelarNuevo {
      background: #f44336;
    }
  `
  ]
})
export class BottomToolbarComponent implements OnInit {

  @Input() botonNuevo          : string   = "Nuevo"; //TODO: Esta variable puede que no tenga que ser un input.
  @Input() insertandoNuevo     : boolean  = false;
  @Input() articuloSeleccionado: Articulo = new Articulo(); //TODO: Probablemente solo necesite un boolean.

  @Output() eliminarArticuloDialog = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  // Navega a la pantalla de nuevo Articulo.
  nuevoArticulo() {
    this.insertandoNuevo = !this.insertandoNuevo;
    this.botonNuevo = this.insertandoNuevo ? "Cancelar" : "Nuevo";
  }
}
