import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DataService, HotkeysService]
})
export class CalendarComponent implements OnInit {
  @Input() data;
  @Input() amount;
  @Input() assignments;
  @Input() showCalendar;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

  change(){
    this.showCalendar = !this.showCalendar;
  }

}
