import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Articulo } from 'src/app/db/articulo';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';
import { DialogEliminarComponent } from '../../components/dialogs/dialog-eliminar/dialog-eliminar.component';
import { VistaArticuloComponent } from '../../components/vista-articulo/vista-articulo.component';
import { saveAs } from 'file-saver';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

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
export class PagePrincipalComponent implements OnInit, AfterViewInit {
  
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
  setVisualizandoArticulo ( visualizandoArticulo: boolean ) { this.visualizandoArticulo = visualizandoArticulo }
  setEditando             ( editando: boolean             ) { this.editando = editando             }
  setInsertandoNuevo      ( insertando: boolean           ) { this.insertandoNuevo = insertando           }

  
  // Para bottom toolbar.
  public botonEditar      : string     = "Editar";
  public insertandoNuevo  : boolean    = false;


  editar:boolean = false;
  nuevo :boolean = false;
  ver   :boolean = false;
  @ViewChild( VistaArticuloComponent ) vistaArticuloComponent!: VistaArticuloComponent;
  @ViewChild( ToolbarComponent       ) toolbarComponent!      : ToolbarComponent;

  formularioValido: boolean = false;
  setFormularioValido ( valido: boolean ) { this.formularioValido = valido }

  constructor(
    private dbServiceArticulo: DbServiceServiceArticulo,
    private dbServiceRevision: DbServiceRevisionService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngAfterViewInit(): void {
    this.setSeccion("Lista de Artículos")
  }

  ngOnInit(): void {
    this.resetLista();

    // Aquí se recive la respuesta del Scanner y te carga en memoria el artículo seleccionado y cambia la vista a vista-articulo => ver
    this.route.params.subscribe( (params: Params) => {
      this.articuloSeleccionado = params['conArticulo']
      if( !params ) this.ver = true;
    })
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

    console.log("Articulo seleccionado: ", this.articuloSeleccionado);
  }

  // Para bottom toolbar..................................

  // Abre un Dialog para confirmar la eliminación del artículo y se queda esperando la respuesta.
  eliminarArticuloDialog() {
    this.dialog.open(DialogEliminarComponent, {
      data: { nombre: this.articuloSeleccionado.nombre }})
      .afterClosed().subscribe(confirmacion => {
        if(confirmacion) this.eliminarArticulo();
    });
  }
  
  // Elimina el Articulo seleccionado en la lista.
  eliminarArticulo() {
    this.dbServiceArticulo.eliminar( this.articuloSeleccionado )
      .subscribe( res => {
        console.log("Articulo eliminado: ", res)

        // Se vuelve a hacer la petición al back para listar los Articulos y se limpia de la memoria el articulo eliminado.
        this.resetLista();
      });
  }

  // Genera el código DataMatrix del artículo seleccionado y te lo descarga.
  generarDataMatrix() {
    this.dbServiceArticulo.generarDataMatrix( this.articuloSeleccionado )
    .subscribe( (res) => {
      saveAs(res, "image.jpg");
    });
  }

  resetLista() {
    this.articuloSeleccionado  = new Articulo();
    this.articuloSeleccionadoB = false;
    this.visualizandoArticulo  = false
    this.editando = false;
    this.insertandoNuevo = false;
    this.listarArticulos();

    console.log("Lista reseteada.");
  }

  // Navegación
  vistaArticulo( tipo: string ) {
    this.visualizandoArticulo = true; 

    let comprobarNuevoEditar = this.nuevo;
            
    this.editar =false;
    this.nuevo  =false;
    this.ver    =false;

    switch ( tipo ) {
      case "VER":
        this.ver = true;
        break;
      case "NUEVO":
        this.nuevo = true;
        break;
      case "EDITAR":
        this.editar = true;
        break;
      case "ATRAS":
        this.visualizandoArticulo = false;
        break;
      case "GUARDAR":
        if ( comprobarNuevoEditar ) this.vistaArticuloComponent.nuevoComponent.guardar();
        else this.vistaArticuloComponent.editarComponent.guardar();
        this.resetLista();
        break;
    }
  }

  // Setea la sección de la toolbar
  setSeccion( seccion: string ) {
    this.toolbarComponent.setSeccion( seccion );
  }
}
