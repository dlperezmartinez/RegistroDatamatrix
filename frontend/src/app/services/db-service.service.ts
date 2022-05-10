import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  private rootUrl      = "http://localhost:8080/api/";
  private consultarUrl = "consultar";

  constructor( private http: HttpClient ) { }

  consultar ( accion: string ) {
    this.http.get( this.rootUrl + this.consultarUrl )
      .subscribe( resp => console.log( resp ) );
  }
}


