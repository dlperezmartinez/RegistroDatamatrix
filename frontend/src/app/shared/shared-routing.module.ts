import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoArticuloComponent } from './pages/nuevo-articulo/nuevo-articulo.component';
import { RegistroDataMatrixComponent } from './pages/registro-data-matrix/registro-data-matrix.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'registro-datamatrix', component: RegistroDataMatrixComponent },
      { path: 'nuevo-articulo', component: NuevoArticuloComponent },
      { path: '**', redirectTo: 'registro-datamatrix' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
