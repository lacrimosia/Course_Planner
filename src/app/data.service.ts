import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
public show;
  constructor(private http: Http) {
  }

  getData() {
  	 return this.http.get('./app/data.json')
  	       .map((res:Response) => res.json());
  }

}
