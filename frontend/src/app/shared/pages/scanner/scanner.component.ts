import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Articulo } from 'src/app/db/articulo';
import { DbServiceServiceArticulo } from 'src/app/services/db-service-articulo.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styles: [`
    button {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9999;
    }
      :host zxing-scanner::ng-deep video {
      max-height: 50vh;    
      object-fit: contain;
    }
      :host zxing-scanner::ng-deep {
      border-style: solid;
      border-radius: 10px;
      border-color: #11171a;
    } 
  `
  ]
})
export class ScannerComponent implements OnInit {

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];

  // @ViewChild('scanner', { static: false })
  // scanner: ZXingScannerComponent = this.getBackCamera();
  
  constructor(
    private dbServiceArticulo: DbServiceServiceArticulo,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  cerrar() {
    this.router.navigate([''])
  }

  onCodeResult(codigoDataMatrix: string) {
    console.log("Código DataMatrix escaneado: ", Number(codigoDataMatrix));
    
    this.dbServiceArticulo.consultar("por-id", Number(codigoDataMatrix))
    .subscribe( res => this.router.navigate([ 'page-principal', res ]));

  }
}
