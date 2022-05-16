import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/db/articulo';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';
import { DialogEliminarComponent } from '../../components/dialogs/dialog-eliminar/dialog-eliminar.component';

@Component({
  selector: 'app-page-principal',
  templateUrl: './page-principal.component.html',
  styles: [`
    .container {
      width: 100%;
      height: 100%;
    }
    .toolbar, .footer {
       
    }
    .toolbar {
    }
    .component {
      overflow: auto;
    }
    .footer {
      width: 100%;
    }
  `
  ]
})
export class PagePrincipalComponent implements OnInit {
  
  /* VARIABLES */

  // Para sidenav.
  @ViewChild('drawer') drawer!: MatSidenav;

  //.....................
  public ultimasRevisiones: Date    [] = [];
  public keysArticulos    : string  [] = [];
  
  // Para lista articulos.
  public articulos        : Articulo[] = []; // Aquí se carga en memoria la petición de articulos que se le hace al back.
  articuloSeleccionado    : Articulo   = new Articulo(); // Aquí se carga en memoria el articulo seleccionado.
  articuloSeleccionadoB   : boolean    = false;


  // Para vista articulo.
  visualizandoArticulo    : boolean    = false; // Mostrar la vista articulo o no.
  editando                : boolean    = false; // Al cargar la vista artículo se le pasa este boolean para activar el modo edición con el articulo seleccionado.
  
  // Para bottom toolbar.
  public botonNuevo       : string     = "Nuevo";
  public insertandoNuevo  : boolean    = false;

  constructor(
    private dbServiceArticulo: DbServiceServiceArticulo,
    private dbServiceRevision: DbServiceRevisionService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.resetLista();
  }

  /* MÉTODOS */
  // Para sidenav.......................................
  toggleSideNav () {
    this.drawer.toggle();
  }

  navegar( ruta: string ) {
    this.router.navigate([ruta]);
  }
  //.................................................

  peticionArticulos() {

  }

  peticionUltimaRevision() {
    
  }

  // Hace una petición al back para listar los Articulos de la base de datos.
  listarArticulos() {
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

  // Para lista articulo..................................
  // Carga en memoria el Articulo seleccionado en la lista.
  elementoSeleccionado( articulo: Articulo ) {
    this.articuloSeleccionado  = articulo;    
    this.articuloSeleccionadoB = true;

    console.log("Articulo seleccionado: ", articulo);
  }

  vistaArticuloToggle() {
    this.visualizandoArticulo = !this.visualizandoArticulo;
    this.resetLista();
  }

  setEditando( editando: boolean ) {
    this.editando = editando;
  }

  // Para bottom toolbar..................................
  // Navega a la pantalla de nuevo Articulo.
  nuevoArticulo() { //TODO QUITAR
    this.insertandoNuevo = !this.insertandoNuevo;
    this.botonNuevo = this.insertandoNuevo ? "Cancelar" : "Nuevo";
  }

  // Abre un Dialog para confirmar la eliminación del artículo y se queda esperando la respuesta.
  eliminarArticuloDialog() {
    this.dialog.open(DialogEliminarComponent, {
      data: { nombre: this.articuloSeleccionado.nombre }})
      .afterClosed().subscribe(confirmacion => {
        if(confirmacion) this.eliminarArticulo();
    });
  }
  
  // Elimina el Articulo seleccionado en la lista.
  eliminarArticulo( ) {
    this.dbServiceArticulo.eliminar( this.articuloSeleccionado )
      .subscribe(res => {
        console.log(res) //TODO: Me gustaría controlar si se ha eliminado correctamente.

        // Se vuelve a hacer la petición al back para listar los Articulos y se limpia de la memoria el articulo eliminado.
        this.resetLista();
      });
  }

  resetLista() {
    this.articuloSeleccionado  = new Articulo();
    this.articuloSeleccionadoB = false;
    this.listarArticulos();

    console.log("Lista reseteada correctamente.");
  }
}
