import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class AuthenticationService {

  private testLink = "http://localhost:4500/testing";

constructor(private http: Http) { }

// show the testing area
getTestingPage(){
  return this.http
      .get(this.testLink)
      .toPromise()
      .then(response=>"Hello World")
      .catch(this.handleError);
}

// Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
