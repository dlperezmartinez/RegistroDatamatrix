import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionNulaPipe } from './revision-nula.pipe';



@NgModule({
  declarations: [
    RevisionNulaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RevisionNulaPipe,
  ]
})
export class PipesModule { }
