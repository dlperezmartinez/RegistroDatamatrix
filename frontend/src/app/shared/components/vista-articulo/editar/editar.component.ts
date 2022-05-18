import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from 'src/app/db/articulo';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [
  ]
})
export class EditarComponent implements OnInit {

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
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario.controls['nombre'].setValue(this.articulo.nombre);
    this.formulario.controls['modelo'].setValue(this.articulo.modelo);
    this.formulario.controls['descripcion'].setValue(this.articulo.descripcion);
  }

  guardar() {
    this.actualizarArticulo();

    this.vistaArticuloEmitter.emit("ATRAS");
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
