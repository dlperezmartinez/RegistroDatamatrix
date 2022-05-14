import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { Articulo } from 'src/app/db/articulo';
import { Revision } from 'src/app/db/revision';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.component.html',
  styles: [`
    .espaciador {
      flex: 1 1 auto;
    }
    .mat-form-field {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .guardar-check {
      margin-top: 10px;
    }
  `
  ]
})
export class NuevoArticuloComponent implements OnInit {

  articulo: Articulo = new Articulo();
  revision: Revision = new Revision();

  formulario: FormGroup = this.fb.group({
    nombre: ["", [ Validators.required ] ],
    modelo: ["", [ Validators.required ] ],
    fecha : ["", [  ] ],
  });

  @Output() listarArticulos = new EventEmitter<void>();

  constructor(
    private dbServiceArticulo: DbServiceServiceArticulo,
    private dbServiceRevision: DbServiceRevisionService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  // Envía una petición al back para guardar el nuevo artículo.
  guardar() {
    this.articulo.nombre = this.formulario.value.nombre;
    this.articulo.modelo = this.formulario.value.modelo;

    // Inserta el Articulo y si ha una fecha espera la respuesta del back para mandarle el Articulo que le ha llegado y la nueva fecha.
    this.dbServiceArticulo.insertar( this.articulo )
      .subscribe((res: Articulo) => {
        if ( this.formulario.value.fecha != '' ) {
          this.dbServiceRevision.insertar( res, this.formulario.value.fecha )
            .subscribe();
        }

      // delay(1);

      this.limpiarFormulario();
      });
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.listarArticulos.emit();
  }
}
