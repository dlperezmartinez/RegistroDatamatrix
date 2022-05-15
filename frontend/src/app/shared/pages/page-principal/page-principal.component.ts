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
  public articulos        : Articulo[] = [];
  articuloSeleccionado    : Articulo   = new Articulo();
  
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
    this.listarArticulos();
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

  // Para lista articulo..................................
  // Carga en memoria el Articulo seleccionado en la lista.
  elementoSeleccionado( articulo: Articulo ) {
    console.log("Articulo seleccionado: ", articulo);
    
    this.articuloSeleccionado = articulo;    
  }

  vistaArticulo() {
    this.router.navigate(['vista-articulo'])
  }

  // Para bottom toolbar..................................
  // Navega a la pantalla de nuevo Articulo.
  nuevoArticulo() {
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
        this.articuloSeleccionado = new Articulo();
        this.listarArticulos();
      });
  }
}
