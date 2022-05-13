import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TablaComponent } from './components/tabla/tabla.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from '../material.module';
import { RegistroDataMatrixComponent } from './pages/registro-data-matrix/registro-data-matrix.component';
import { NuevoArticuloComponent } from './pages/nuevo-articulo/nuevo-articulo.component';


@NgModule({
  declarations: [
    TablaComponent,
    ToolbarComponent,
    SidenavComponent,
    RegistroDataMatrixComponent,
    NuevoArticuloComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
  ],
  exports: [
    ToolbarComponent,
    TablaComponent,
  ]
})
export class SharedModule { }
