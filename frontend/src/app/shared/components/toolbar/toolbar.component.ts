import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDataMatrixComponent } from '../../pages/registro-data-matrix/registro-data-matrix.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [`
    .titulo {
      margin: 10px;
    }
    .espaciador {
      flex: 1 1 auto;
    }
  `
  ]
})
export class ToolbarComponent implements OnInit {
  // VARIABLES
  titulo : string = "REGISTRO DATAMATRIX";
  seccion: string = "Sección por defecto";
  
  @Input() set setSeccion( seccion: string ) { this.seccion = seccion } 

  // CONSTRUCTOR Y NGON's
  constructor( public router: Router) { }

  ngOnInit(): void {
    console.log("Router url toolbar: ", this.router.url);
  }

  // MÉTODOS
  volver() {
    this.router.navigate(['registro-datamatrix'])
  }
}
