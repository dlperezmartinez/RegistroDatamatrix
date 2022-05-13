import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.component.html',
  styles: [
  ]
})
export class NuevoArticuloComponent implements OnInit {

  seccion: string = "Nuevo Articulo"
  // @ViewChild(ToolbarComponent) set 

  constructor() { }

  ngOnInit(): void {
  }

}
