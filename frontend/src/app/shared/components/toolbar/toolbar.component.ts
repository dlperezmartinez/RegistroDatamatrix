import { Component, OnInit } from '@angular/core';

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
  titulo: string = "TÍTULO";

  // CONSTRUCTOR Y NGON's
  constructor() { }

  ngOnInit(): void {
  }

  // MÉTODOS
}
