import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-eliminar',
  templateUrl: './dialog-eliminar.component.html',
  styles: [`
      .espaciador {
      flex: 1 1 auto;
    }
  `
  ]
})
export class DialogEliminarComponent implements OnInit {

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: {nombre: string},
    public dialogRef: MatDialogRef<DialogEliminarComponent>
  ) { }

  ngOnInit(): void {
  }

  eliminar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
