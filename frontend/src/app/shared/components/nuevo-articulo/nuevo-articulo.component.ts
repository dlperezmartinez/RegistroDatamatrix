import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToolbarComponent } from '../toolbar/toolbar.component';

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
  `
  ]
})
export class NuevoArticuloComponent implements OnInit {

  seccion: string = "Nuevo Articulo"
  // @ViewChild(ToolbarComponent) set 

  selectorFecha: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    modelo: new FormControl(''),
    fecha: new FormControl(new Date())
  });

  constructor() { }

  ngOnInit(): void {
  }

}
