import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/db/articulo';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [`
    .titulo, .seccion {
      margin-left: 15px;
    }
    .espaciador {
      flex: 1 1 auto;
    }
  `
  ]
})
export class ToolbarComponent implements OnInit {
  // VARIABLES
  titulo : string = "REGISTRO DATAMATRIX";
  seccion: string = "";
  
  @Input() set setSeccion( seccion: string ) { this.seccion = seccion } 

  @Input() visualizandoArticulo : boolean = false;

  @Input() articuloSeleccionadoB: boolean = false; // Por no crear más variables en el padre, envío aquí el artículo seleccionado.

  @Output() toggleSideNav       = new EventEmitter<void>();

  @Output() vistaArticuloToggle = new EventEmitter<void>();

  @Output() editando            = new EventEmitter<boolean>();

  // CONSTRUCTOR Y NGON's
  constructor( 
    public router: Router,
    private datosCompartidos: DatosCompartidosService,
  ) { }

  ngOnInit(): void {
    console.log("Router url toolbar: ", this.router.url);
    this.seccion = this.datosCompartidos.getSeccion();
  }

  // MÉTODOS
  volver() {
    this.vistaArticuloToggle.emit();
  }
}
