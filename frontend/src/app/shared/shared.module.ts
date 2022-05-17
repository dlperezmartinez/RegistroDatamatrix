import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { SharedRoutingModule } from './shared-routing.module';
import { TablaComponent } from './components/tabla/tabla.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../material.module';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VistaArticuloComponent } from './components/vista-articulo/vista-articulo.component';

// Scanner DataMatrix
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { DialogEliminarComponent } from './components/dialogs/dialog-eliminar/dialog-eliminar.component';
import { PagePrincipalComponent } from './pages/page-principal/page-principal.component';
import { BottomToolbarComponent } from './components/bottom-toolbar/bottom-toolbar.component';
import { ListaArticulosComponent } from './components/lista-articulos/lista-articulos.component';
import { VerComponent } from './components/vista-articulo/ver/ver.component';
import { EditarComponent } from './components/vista-articulo/editar/editar.component';
import { NuevoComponent } from './components/vista-articulo/nuevo/nuevo.component';

@NgModule({
  declarations: [
    TablaComponent,
    ToolbarComponent,
    NuevoArticuloComponent,
    VistaArticuloComponent,
    ScannerComponent,
    DialogEliminarComponent,
    PagePrincipalComponent,
    BottomToolbarComponent,
    ListaArticulosComponent,
    VerComponent,
    EditarComponent,
    NuevoComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedRoutingModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
    
    // Scanner DataMatrix
    ZXingScannerModule,
  ],
  exports: [
    ToolbarComponent,
    TablaComponent,
  ]
})
export class SharedModule { }
