import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroDataMatrixComponent } from './pages/registro-data-matrix/registro-data-matrix.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { VistaArticuloComponent } from './pages/vista-articulo/vista-articulo.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'registro-datamatrix', component: RegistroDataMatrixComponent },
      { path: 'vista-articulo', component: VistaArticuloComponent },
      { path: 'scanner', component: ScannerComponent },
      { path: '**', redirectTo: 'registro-datamatrix' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
