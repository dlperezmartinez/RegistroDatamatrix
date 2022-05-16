import { Component, Input, OnInit } from '@angular/core';
import { Articulo } from 'src/app/db/articulo';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';

@Component({
  selector: 'app-vista-articulo',
  templateUrl: './vista-articulo.component.html',
  styles: [`
  .card-articulo {
    /* max-width: 40%; */
    /* margin-left: 20%; */
  }
  .imagen-escritorio {
    max-width: 40%;
  }
  .imagen-movil {
    
  }

  `
  ]
})
export class VistaArticuloComponent implements OnInit {

  seccion     : string  = "Vista Artículo"; // Variable para establecer el título de la sección en la toolbar.
  vistaMovil  : boolean = true; 

  @Input() articulo : Articulo = new Articulo();

  @Input() editando : boolean = false;


  constructor(
    private datosCompartidos: DatosCompartidosService,
  ) { 
  }

  ngOnInit(): void {
    this.datosCompartidos.setSeccion(this.seccion);
    console.log("Editando: ", this.editando)
  }
}
