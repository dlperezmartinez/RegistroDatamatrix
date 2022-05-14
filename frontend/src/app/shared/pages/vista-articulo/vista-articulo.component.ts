import { Component, OnInit } from '@angular/core';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';

@Component({
  selector: 'app-vista-articulo',
  templateUrl: './vista-articulo.component.html',
  styles: [
  ]
})
export class VistaArticuloComponent implements OnInit {

  seccion: string = "Vista Artículo"; // Variable para establecer el título de la sección en la toolbar.
  
  constructor(
    private datosCompartidos: DatosCompartidosService,
  ) { }

  ngOnInit(): void {
    this.datosCompartidos.setSeccion(this.seccion);
  }

}
