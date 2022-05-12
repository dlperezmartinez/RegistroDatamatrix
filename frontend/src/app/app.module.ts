import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { DbServiceServiceArticulo } from './services/db-service-articulo.service';
import { DbServiceRevisionService } from './services/db-service-revision.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    //Mis módulos
    MaterialModule,
    SharedModule,
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    DbServiceServiceArticulo,
    DbServiceRevisionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
