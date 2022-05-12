import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

// fxFlex
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,

    // fxFlex
    FlexLayoutModule,
  ],
  exports: [
    // Material
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,

    // fxFlex
    FlexLayoutModule,
  ]
})
export class MaterialModule { }
