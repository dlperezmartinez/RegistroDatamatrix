import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Articulo } from '../db/articulo';
import { Revision } from '../db/revision';

@Injectable({
  providedIn: 'root'
})
export class DbServiceRevisionService {
  private rootUrl      = environment.apiBaseUrl + "/revisiones/";

  constructor( private http: HttpClient ) { }

  consultar ( opcion: string, articulo: Articulo[] ): Observable<Date[]> {
    return this.http.post<Date[]>( this.rootUrl + "consultar?opcion=" + opcion, articulo );
  }

  insertar ( articulo: Articulo, fecha: Date ): Observable<Revision> {
    let nuevaFecha = fecha.getDate() + "/" + fecha.getUTCMonth() + "/" + fecha.getFullYear();
    return this.http.post<Revision>( this.rootUrl + "insertar?fecha=" + fecha.valueOf(), articulo );
  }  

  actualizar ( articulo: Revision ): Observable<Revision> {
    return this.http.post<Revision>( this.rootUrl + "insertar", articulo );
  }  
}
