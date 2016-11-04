import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ValueService {
  value:number = 0;

  constructor() { }

  goTo(value){
    this.value = value;
    console.log('value service inside', this.value);
  }

}
