import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-calendar-app',
  templateUrl: './calendar-app.component.html',
  styleUrls: ['./calendar-app.component.scss'],
  providers: [DataService, HotkeysService]
})
export class CalendarAppComponent implements OnInit {
  @Input() data;
  @Input() amount;
  @Input() assignments;
  // @Input() showCalendar;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

}
