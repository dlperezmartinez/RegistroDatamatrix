import { Component, OnInit } from '@angular/core';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';

@Component({
  selector: 'app-registro-data-matrix',
  templateUrl: './registro-data-matrix.component.html',
  styles: [`
  .container {
    overflow: auto;
  }
  `
  ]
})
export class RegistroDataMatrixComponent implements OnInit {

  seccion: string = "Lista de Artículos"; // Variable para establecer el título de la sección en la toolbar.

  constructor(
    private datosCompartidos: DatosCompartidosService,
  ) { }

  ngOnInit(): void {
    this.datosCompartidos.setSeccion(this.seccion);
  }
}
