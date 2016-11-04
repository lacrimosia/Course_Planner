import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  providers: [DataService, HotkeysService]
})
export class InstructionsComponent implements OnInit {

  @Input() data;
  @Input() instructions;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

}
