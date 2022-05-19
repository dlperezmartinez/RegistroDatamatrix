import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Articulo } from 'src/app/db/articulo';
import { Revision } from 'src/app/db/revision';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';
import { FormularioInvalidoComponent } from '../../dialogs/formulario-invalido/formulario-invalido.component';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styles: [`
  :host {
    /* display: flex;
    flex-direction: column;
    align-items: flex-start; */
  }
  `
  ]
})
export class NuevoComponent implements OnInit {

  seccion: string = "Nuevo Artículo"

  nuevoArticulo: Articulo = new Articulo();
  nuevaRevision: Revision = new Revision();

  formulario: FormGroup = this.fb.group({
    nombre      : ["", [ Validators.required ] ],
    modelo      : ["", [ Validators.required ] ],
    revision    : ["", [  ] ],
    descripcion : ["", [  ] ],
  });

  @Output() vistaArticuloEmitter = new EventEmitter<string>();

  constructor(
    private dbServiceArticulo: DbServiceServiceArticulo,
    private dbServiceRevision: DbServiceRevisionService,
    private datosCompartidos : DatosCompartidosService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.datosCompartidos.setSeccion( this.seccion );
  }

  guardar() {
    if( this.formulario.valid ) {
      this.insertarNuevo();

      this.vistaArticuloEmitter.emit("ATRAS");
    } else {
      this.dialog.open( FormularioInvalidoComponent );
    }
  }

  insertarNuevo() {
    this.nuevoArticulo.nombre      = this.formulario.value.nombre;
    this.nuevoArticulo.modelo      = this.formulario.value.modelo;
    this.nuevoArticulo.descripcion = this.formulario.value.descripcion;

    // Inserta el Articulo y si ha una fecha espera la respuesta del back para mandarle el Articulo que le ha llegado y la nueva fecha.
    this.dbServiceArticulo.insertar( this.nuevoArticulo )
      .subscribe((res: Articulo) => {
        if ( this.formulario.value.revision != '' ) {
          this.dbServiceRevision.insertar( res, this.formulario.value.revision )
            .subscribe();
        }
      });
  }
}
