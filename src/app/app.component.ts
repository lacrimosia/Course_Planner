import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService} from './data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from './keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService, HotkeysService]
})
export class AppComponent implements OnInit{
 d:number = 0;
 data:any;
 amount:number;
 assignments: any;

 constructor(private dataService: DataService, private _hotkeysService: HotkeysService){

 }

 ngOnInit() {
   this.data = this.dataService.getData()
     .subscribe(
        data => {
         this.data = data;
         this.amount = this.data.assignments.length;
         this.assignments = this.data.assignments;
       //  console.log("the data list", this.amount);
        },
        err => console.error(err),
        () => console.log('nav data loaded')

     );
 }
}
