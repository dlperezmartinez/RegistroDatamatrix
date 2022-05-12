import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Revision } from '../db/revision';

@Injectable({
  providedIn: 'root'
})
export class DbServiceRevisionService {
  private rootUrl      = environment.apiBaseUrl + "/revisiones/";

  constructor( private http: HttpClient ) { }

  consultar ( id: number ): Observable<Revision[]> {
    return this.http.get<Revision[]>( this.rootUrl + "consultar?id=" + id);
      // .subscribe( resp => console.log( resp ) );
  }

}
