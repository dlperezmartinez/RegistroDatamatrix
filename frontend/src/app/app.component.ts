import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DatosCompartidosService } from './services/datos-compartidos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  sideNav = false;
  
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    private router: Router,
    private datosCompartidos: DatosCompartidosService,
  ) {
    datosCompartidos.changeEmitted$.subscribe(text => this.toggleSideNav()
    )
  }

  toggleSideNav () {
    this.sideNav = !this.sideNav;
    this.drawer.toggle();
  }

  navegar( ruta: string ) {
    this.router.navigate([ruta]);
  }
}
