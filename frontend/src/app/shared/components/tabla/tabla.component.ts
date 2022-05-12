import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Articulo } from 'src/app/db/articulo';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [`
    .cabecera-lista {
      background: lightgrey;
      border-radius: 10px 10px 0 0;

      text-align: center;
      color: black;
    }
    .elementos-lista {
      text-align: center;
    }
    .botones-pie {
      position: fixed;
      bottom: 0;
      
      height: 60px;
      width: 100%;
    }
    .espaciador {
      flex: 1 1 auto;
    }
    button {
      margin: 8px;
    }
  `
  ]
})
export class TablaComponent implements OnInit {

  /* VARIABLES */
  public articulos: Articulo[] = [];
  public keysArticulos: string[] = [];

  seleccionado: boolean = false;

  // Datos compartidos

  constructor( private dbServiceArticulo: DbServiceServiceArticulo ) { }

  ngOnInit(): void {
    this.listarArticulos();
  }

  test() {
    console.log("TEST");
    
  }

  listarArticulos() {
    this.dbServiceArticulo.consultar("todo")
      .subscribe((res: Articulo[]) => {
        this.articulos = res;
      });
  }

  elementoSeleccionado() {
    this.seleccionado = true;
  }
}
