import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  private rootUrl      = "http://localhost:8080/api/";
  private consultarUrl = "consultar";

  // ACCIONES CONSULAR
  public articulos  = "articulos"; //TODO: probando si se puede hacer uso de estas propiedades desde fuera.
  public revisiones = "revisiones";

  constructor( private http: HttpClient ) { }

  consultar ( accion: string ) {
    this.http.get( this.rootUrl + this.consultarUrl + "?accion=" + accion  )
      .subscribe( resp => console.log( resp ) );
  }
}


