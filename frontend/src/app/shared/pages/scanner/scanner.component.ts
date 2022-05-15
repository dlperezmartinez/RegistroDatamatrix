import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';

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
  `
  ]
})
export class ScannerComponent implements OnInit {

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  cerrar() {
    this.router.navigate([''])
  }
}
