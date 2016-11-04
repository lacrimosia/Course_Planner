import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ValueService {
  value:number;

  constructor() {
    this.value = 0;
  }

  goTo(value){
    this.value = value;
    console.log('value service inside', this.value);
  }
}
