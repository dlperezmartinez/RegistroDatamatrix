import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [`
    .titulo {
      margin: 10px;
    }
  `
  ]
})
export class ToolbarComponent implements OnInit {
  // VARIABLES
  titulo : string = "REGISTRO DATAMATRIX";
  seccion: string = "";
  
  @Input() set setSeccion( seccion: string ) { this.seccion = seccion } 

  // CONSTRUCTOR Y NGON's
  constructor() { }

  ngOnInit(): void {
  }

  // MÉTODOS
}
