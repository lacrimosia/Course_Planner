import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
  providers: [DataService, HotkeysService]
})
export class SavedComponent implements OnInit {

  @Input() data;
  @Input() amount;
  @Input() assignments;
  @Input() alert;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  
  }

  close(){
    this.data.alert = false;
  }

}
