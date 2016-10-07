import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
public show;
public value: number;

  constructor(private http: Http) {
    this.value = 0;
  }

  getData() {
  	 return this.http.get('assets/data.json')
  	       .map((res:Response) => res.json());
  }

}
