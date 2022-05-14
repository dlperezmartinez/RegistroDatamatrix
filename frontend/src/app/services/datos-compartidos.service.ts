import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  seccion: string = "Sección por defecto";

  constructor() { }

  setSeccion( nuevaSeccion: string ) {
    this.seccion = nuevaSeccion;
  }

  getSeccion() : string{
    return this.seccion;
  }
}
