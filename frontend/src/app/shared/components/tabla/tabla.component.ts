import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  articuloSeleccionado: Articulo = new Articulo();

  constructor( 
    private dbServiceArticulo: DbServiceServiceArticulo,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.listarArticulos();
  }

  // Hace una petición al back para listar los Articulos de la base de datos.
  listarArticulos() {
    this.dbServiceArticulo.consultar("todo")
      .subscribe((res: Articulo[]) => {
        this.articulos = res;
      });
  }

  // Carga en memoria el Articulo seleccionado en la lista.
  elementoSeleccionado( articulo: Articulo ) {
    console.log("Articulo seleccionado: ", articulo);
    
    this.articuloSeleccionado = articulo;    
  }

  // Navega a la pantalla de nuevo Articulo.
  nuevoArticulo() {
    this.router.navigate(['nuevo-articulo'])

    // this.dbServiceArticulo.insertar( this.)
  }

  // Elimina el Articulo seleccionado en la lista.
  eliminarArticulo( ) {
    this.dbServiceArticulo.eliminar( this.articuloSeleccionado.id )
      .subscribe(res => console.log(res));

    // Se vuelve a hacer la petición al back para listar los Articulos.
    this.listarArticulos();
  }
}
