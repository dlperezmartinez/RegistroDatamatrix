import { Component, Input, OnInit } from '@angular/core';
import { Articulo } from 'src/app/db/articulo';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: [
  ]
})
export class VerComponent implements OnInit {

  @Input() articulo          : Articulo = new Articulo();

  @Input() listaRevisiones   : Date[]   = [];

  constructor() { }

  ngOnInit(): void {
  }

}
