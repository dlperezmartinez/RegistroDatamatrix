import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './shared/components/tabla/tabla.component';

const routes: Routes = [
  { path: 'shared', loadChildren: () => import( './shared/shared.module').then( module => module.SharedModule ) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
