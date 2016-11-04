import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import { ValueService } from '../value.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  providers: [DataService, HotkeysService, ValueService]
})
export class HeadingComponent implements OnInit {
  @Input() data;
  @Input() assignments;
  @Input() value;
  @Input() valueChanged;
  title:string;
  symbol:any;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService, public valueService: ValueService) {

   }

  ngOnInit() {
  }

}
