import { Component, OnInit } from '@angular/core';
import { DbServiceService } from 'src/app/services/db-service.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [
  ]
})
export class TablaComponent implements OnInit {

  constructor( private dbService: DbServiceService ) { }

  ngOnInit(): void {
  }

  test() {
    this.dbService.consultar("consultar") //TODO CAMBIAR
  }
}
