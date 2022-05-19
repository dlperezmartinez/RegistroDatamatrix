import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Articulo } from 'src/app/db/articulo';
import { DatosCompartidosService } from 'src/app/services/datos-compartidos.service';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';
import { FormularioInvalidoComponent } from '../../dialogs/formulario-invalido/formulario-invalido.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['../vista-articulo-styles.css'],
})
export class EditarComponent implements OnInit {

  seccion: string = "Editar Artículo"

  @Input() articulo: Articulo = new Articulo();

  articuloEditado  : Articulo = new Articulo();

  formulario: FormGroup = this.fb.group({
    nombre         : [ '',      [ Validators.required ] ],
    modelo         : [ '',      [ Validators.required ] ],
    descripcion    : [ '',      [  ] ],
  });

  @Output() vistaArticuloEmitter = new EventEmitter<string>();

  constructor(
    private dbServiceArticulo: DbServiceServiceArticulo,
    private datosCompartidos : DatosCompartidosService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario.controls['nombre'].setValue(this.articulo.nombre);
    this.formulario.controls['modelo'].setValue(this.articulo.modelo);
    this.formulario.controls['descripcion'].setValue(this.articulo.descripcion);

    this.datosCompartidos.setSeccion( this.seccion );
  }

  guardar() {
    if( this.formulario.valid ) {
      this.actualizarArticulo();

      this.vistaArticuloEmitter.emit("ATRAS");
    } else {
      this.dialog.open( FormularioInvalidoComponent );
    }
  }

  actualizarArticulo() {
    // Hace falta setearle su antiguo id para que sea un UPDATE
    this.articuloEditado.id          = this.articulo.id;
    
    this.articuloEditado.nombre      = this.formulario.value.nombre;
    this.articuloEditado.modelo      = this.formulario.value.modelo;
    this.articuloEditado.descripcion = this.formulario.value.descripcion;
    
    this.dbServiceArticulo.actualizar( this.articuloEditado )
      .subscribe(res => console.log("Articulo editado: ", res));
  }
}
