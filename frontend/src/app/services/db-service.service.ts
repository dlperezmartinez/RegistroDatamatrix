import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  root = "/api/";

  constructor( private http: HttpClient ) { }

  consultar ( accion: string ) {
    this.http.get( this.root + accion )
      .subscribe( resp => console.log( resp ) );
  }
}


