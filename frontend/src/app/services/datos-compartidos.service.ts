import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  seccion: string = "Sección por defecto";

    // Necesario para envíar la instrucción de abrir/cerrar el sidenav.
    private emitirToggle = new Subject<any>();
    changeEmitted$ = this.emitirToggle.asObservable();


  constructor() { }

  setSeccion( nuevaSeccion: string ) {
    this.seccion = nuevaSeccion;
  }

  getSeccion() : string{
    return this.seccion;
  }

  // Dispara el toggle del sidenav.
  toggleSideNavDisparador(change: any) {
    this.emitirToggle.next(change);
  }
}
