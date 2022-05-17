import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/db/articulo';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';
import { DbServiceRevisionService } from 'src/app/services/db-service-revision.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styles: [
  ]
})
export class NuevoComponent implements OnInit {

  nuevoArticulo: Articulo = new Articulo();

  constructor(
    private dbServiceArticulo: DbServiceServiceArticulo,
    private dbServiceRevision: DbServiceRevisionService,
  ) { }

  ngOnInit(): void {
  }

  insertarArticulo() {
    this.dbServiceArticulo.insertar(this.nuevoArticulo)
      .subscribe(( res: Articulo ) => console.log("Articulo insertado:", res));
  }

}
