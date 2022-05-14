import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revisionNula'
})
export class RevisionNulaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let pipe  = new DatePipe("en-US");

    if (!value) return "No disponible"
    else return pipe.transform(value, "dd-MM-yyyy");
  }
}
