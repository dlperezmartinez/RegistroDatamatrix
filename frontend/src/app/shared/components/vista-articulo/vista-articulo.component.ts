import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { delay } from 'rxjs';
import { Articulo } from 'src/app/db/articulo';
import { Revision } from 'src/app/db/revision';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';
import { EditarComponent } from './editar/editar.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { VerComponent } from './ver/ver.component';

@Component({
  selector: 'app-vista-articulo',
  templateUrl: './vista-articulo.component.html',
  styleUrls: ['./vista-articulo-styles.css'],
})
export class VistaArticuloComponent implements OnInit, AfterViewChecked {

  seccion           : string   = "Vista Artículo"; // Variable para establecer el título de la sección en la toolbar.
  vistaMovil        : boolean  = true; 
  listaRevisiones   : Date[]   = [];

  @Input() articulo : Articulo = new Articulo();

  @Input() editar: boolean = false;
  @Input() nuevo: boolean = false;
  @Input() ver: boolean = false;

  @Output() vistaArticuloEmitter          = new EventEmitter<string>();
  @Output() seccionEmitter                = new EventEmitter<string>();
  @Output() formularioValidoEmitter       = new EventEmitter<boolean>();

  @ViewChild( EditarComponent ) editarComponent!: EditarComponent;
  @ViewChild( NuevoComponent  ) nuevoComponent !: NuevoComponent;
  @ViewChild( VerComponent    ) verComponent   !: VerComponent;

  constructor(
    private dbServiceRevision: DbServiceRevisionService,
    private datosCompartidos : DatosCompartidosService,
  ) { 
  }

  ngAfterViewChecked(): void {
    this.setSeccion();
  }

  ngOnInit(): void {
    this.datosCompartidos.setSeccion( this.seccion );

    this.listarRevisiones( this.articulo );

    console.log("Vista articulo: ");
    console.log("Editar", this.editar);
    console.log("Nuevo", this.nuevo);
    console.log("Ver", this.ver);
  }

  listarRevisiones( articulo: Articulo ) {
    let articuloALista = [articulo];
    this.dbServiceRevision.consultar( "todo", articuloALista )
      .subscribe( (res: Date[]) => this.listaRevisiones = res )
  }

  // Setea la sección según las variables booleanas editar, nuevo y ver.
  setSeccion() {
    if( this.editar ) this.seccionEmitter.emit( this.editarComponent.seccion );
    if( this.nuevo  ) this.seccionEmitter.emit( this.nuevoComponent.seccion  );
    if( this.ver    ) this.seccionEmitter.emit( this.verComponent.seccion    );
  }
}
