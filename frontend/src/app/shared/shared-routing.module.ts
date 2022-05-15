import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagePrincipalComponent } from './pages/page-principal/page-principal.component';
import { ScannerComponent } from './pages/scanner/scanner.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'page-principal', component: PagePrincipalComponent },
      { path: 'scanner', component: ScannerComponent },
      { path: '**', redirectTo: 'page-principal' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
