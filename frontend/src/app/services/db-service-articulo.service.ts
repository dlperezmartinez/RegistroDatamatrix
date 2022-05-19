import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
// import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { environment } from 'src/environments/environment';
import { Articulo } from '../db/articulo';

@Injectable({
  providedIn: 'root'
})
export class DbServiceServiceArticulo {
  private rootUrl = environment.apiBaseUrl + "/articulos/";

  constructor( 
    private httpClient: HttpClient,
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

  eliminar ( articulo: Articulo ): Observable<Articulo> {
    return this.httpClient.post<Articulo>( this.rootUrl + "eliminar", articulo );
  }

  generarDataMatrix( articulo: Articulo ) {
    return this.httpClient.get( this.rootUrl + "datamatrix?id=" + articulo.id, { responseType: 'blob' } );
  }




  getData(url: string): Observable<string> {
    return this.httpClient.get(url, { responseType: 'blob' })
      .pipe(
        switchMap(response => this.readFile(response))
      );
  }

  private readFile(blob: Blob): Observable<string> {
    return Observable.create((obs: any) => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }
}


