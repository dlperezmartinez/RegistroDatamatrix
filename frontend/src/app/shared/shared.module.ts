import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TablaComponent } from './components/tabla/tabla.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from '../material.module';
import { RegistroDataMatrixComponent } from './pages/registro-data-matrix/registro-data-matrix.component';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VistaArticuloComponent } from './pages/vista-articulo/vista-articulo.component';


@NgModule({
  declarations: [
    TablaComponent,
    ToolbarComponent,
    SidenavComponent,
    RegistroDataMatrixComponent,
    NuevoArticuloComponent,
    VistaArticuloComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToolbarComponent,
    TablaComponent,
  ]
})
export class SharedModule { }
