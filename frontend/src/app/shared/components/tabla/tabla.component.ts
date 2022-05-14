import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/db/articulo';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';

//TODO: max-height: 750px; hacer esto responsive
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [`
    mat-selection-list {
      max-height: 750px;
      overflow: auto;
    }
    .lista {
    }
    .cabecera-lista {
      background: lightgrey;
      border-radius: 10px 10px 0 0;

      text-align: center;
      color: black;
    }
    .elementos-lista {
      text-align: center;
    }
    .nuevo-articulo {
      margin: 50px;
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
    .nuevo {
      background: #69f0ae;
    }
    .cancelarNuevo {
      background: #f44336;
    }
  `
  ]
})
export class TablaComponent implements OnInit {

  /* VARIABLES */
  public articulos        : Articulo[] = [];
  public ultimasRevisiones: Date    [] = [];
  public keysArticulos    : string  [] = [];

  public insertandoNuevo  : boolean    = false;
  public botonNuevo       : string     = "Nuevo";

  articuloSeleccionado: Articulo = new Articulo();

  constructor( 
    private dbServiceArticulo: DbServiceServiceArticulo,
    private dbServiceRevision: DbServiceRevisionService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.listarArticulos();
  }

  // Hace una petición al back para listar los Articulos de la base de datos.
  listarArticulos() {
    if ( this.insertandoNuevo ) this.nuevoArticulo(); //TODO: Mirar si esto es una locura.

    // Primero se hace petición de los Articulos...
    this.dbServiceArticulo.consultar("todo")
      .subscribe((res: Articulo[]) => {
        this.articulos = []; // Reset para limpiar posible basura.
        this.articulos = res;

        // y una vez con el resultado se puede hacer la petición de las Revisiones.
        this.dbServiceRevision.consultar("ultima", this.articulos)
        .subscribe((res: Date[]) => {
          this.ultimasRevisiones = []; // Reset para limpiar posible basura.
          this.ultimasRevisiones = res;
        })
      });
  }

  // Carga en memoria el Articulo seleccionado en la lista.
  elementoSeleccionado( articulo: Articulo ) {
    console.log("Articulo seleccionado: ", articulo);
    
    this.articuloSeleccionado = articulo;    
  }

  vistaArticulo() {
    this.router.navigate(['vista-articulo'])
  }

  // Navega a la pantalla de nuevo Articulo.
  nuevoArticulo() {
    this.insertandoNuevo = !this.insertandoNuevo;
    this.botonNuevo = this.insertandoNuevo ? "Cancelar" : "Nuevo";

    // this.dbServiceArticulo.insertar( this.)
  }

  // Elimina el Articulo seleccionado en la lista.
  eliminarArticulo( ) {
    this.dbServiceArticulo.eliminar( this.articuloSeleccionado.id )
      .subscribe(res => {
        console.log(res) //TODO: Me gustaría controlar si se ha eliminado correctamente.
        // Se vuelve a hacer la petición al back para listar los Articulos.
        this.listarArticulos();
      });
  }
}
