import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Articulo } from 'src/app/db/articulo';
import { Revision } from 'src/app/db/revision';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';

@Component({
  selector: 'app-vista-articulo',
  templateUrl: './vista-articulo.component.html',
  styles: [`
  mat-card {
    margin-top: 15px;
  }
  img {
    max-width: 600px;
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

  seccion           : string   = "Vista Artículo"; // Variable para establecer el título de la sección en la toolbar.
  vistaMovil        : boolean  = true; 
  listaRevisiones   : Date[]   = [];

  @Input() articulo : Articulo = new Articulo();

  @Input() visualizandoArticulo : boolean  = false;
  @Input() editando             : boolean  = false;
  @Input() insertandoNuevo      : boolean  = false;


  constructor(
    private datosCompartidos : DatosCompartidosService,
    private dbServiceRevision: DbServiceRevisionService,
  ) { 
  }

  ngOnInit(): void {
    this.datosCompartidos.setSeccion( this.seccion );

    console.log( "Editando: ", this.editando )
    console.log( this.articulo );

    this.listarRevisiones( this.articulo );

    console.log("00000000000000000");
    console.log("Visualizando", this.visualizandoArticulo);
    console.log("editando", this.editando);
    console.log("insertando", this.insertandoNuevo);
    
    
  }

  listarRevisiones( articulo: Articulo ) {
    let articuloALista = [articulo];
    this.dbServiceRevision.consultar( "todo", articuloALista )
      .subscribe( (res: Date[]) => this.listaRevisiones = res )
  }
}
