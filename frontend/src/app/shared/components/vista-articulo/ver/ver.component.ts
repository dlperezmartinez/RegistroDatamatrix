import { Component, Input, OnInit } from '@angular/core';
import { Articulo } from 'src/app/db/articulo';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['../vista-articulo-styles.css'],
})
export class VerComponent implements OnInit {

  seccion: string = "Ver Artículo"

  @Input() articulo          : Articulo = new Articulo();

  @Input() listaRevisiones   : Date[]   = [];

  constructor(
    private datosCompartidos : DatosCompartidosService,
  ) { }

  ngOnInit(): void {
    this.datosCompartidos.setSeccion( this.seccion );
  }
}
