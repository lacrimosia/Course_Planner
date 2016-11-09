import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.scss'],
  providers: [DataService, HotkeysService]
})
export class PreviousComponent implements OnInit {

  @Input() data;
  @Input() assignments;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

  // Prev button
  prev(){
    if(this.data.value > 0){
      this.data.value--;
    }

    if(this.data.value < this.assignments.length-1){
      this.data.print = false;
    }
  }

}
