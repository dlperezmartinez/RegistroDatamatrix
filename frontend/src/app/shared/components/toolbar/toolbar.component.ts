import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input() visualizandoArticulo: boolean = false;

  @Output() toggleSideNav = new EventEmitter<void>();

  @Output() vistaArticuloToggle = new EventEmitter<boolean>();

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
    this.vistaArticuloToggle.emit(false);
  }
}
