import { HttpClient } from '@angular/common/http';
// import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Articulo } from '../db/articulo';

@Injectable({
  providedIn: 'root'
})
export class DbServiceServiceArticulo {
  private rootUrl = environment.apiBaseUrl + "/articulos/";

  constructor( 
    private httpClient: HttpClient,
    // private http: HTTP, //TODO: Peticiones en el mobil.
    ) { }

  consultar ( opcion: string, id?: number ): Observable<Articulo[]> {
    if (id) opcion = opcion + "&id=" + id;

    return this.httpClient.get<Articulo[]>( this.rootUrl + "consultar?opcion=" + opcion)
  }

  insertar ( articulo: Articulo ): Observable<Articulo> {
    return this.httpClient.post<Articulo>( this.rootUrl + "insertar", articulo );
  }  
  
  actualizar ( articulo: Articulo ): Observable<Articulo> {
    return this.httpClient.put<Articulo>( this.rootUrl + "actualizar", articulo );
  }

  eliminar ( id: number ): Observable<void> {
    return this.httpClient.delete<void>( this.rootUrl + "eliminar?id=" + id );
  }
}


