import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appSetSeccion]'
})
export class SetSeccionDirective implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
