import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
  providers: [DataService, HotkeysService]
})
export class PrintComponent implements OnInit {
  data: any;
  amount: number;
  assignments: any;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

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
         () => console.log('print data loaded')

      );
  }

}
