import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  providers: [DataService, HotkeysService]
})
export class ErrorComponent implements OnInit {
  @Input() data;
  @Input() amount;
  @Input() assignments;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

}
