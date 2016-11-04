import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  providers: [DataService, HotkeysService]
})
export class HeadingComponent implements OnInit {
  @Input() data;
  @Input() assignments;
  @Input() value;
  title:string;
  symbol:any;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) {

   }

  ngOnInit() {
  }

}
