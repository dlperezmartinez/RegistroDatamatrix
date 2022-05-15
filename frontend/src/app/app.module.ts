import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mis módulos
import { MaterialModule } from './material.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';

// Services
import { DbServiceServiceArticulo } from './services/db-service-articulo.service';
import { DbServiceRevisionService } from './services/db-service-revision.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //@Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
    
    //Mis módulos
    MaterialModule,
    PipesModule,
    SharedModule,
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    DbServiceServiceArticulo,
    DbServiceRevisionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
