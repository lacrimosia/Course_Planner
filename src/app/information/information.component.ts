import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  providers: [DataService, HotkeysService]
})
export class InformationComponent implements OnInit {

	@Input() data;
	@Input() assignments;
  @Input() amount;
  @Input() value;
  count:number = 0;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

// keeps track of progress
  progress(){
    return Math.round(this.data.value * 14.28);
  }

// shows the colors for the progress bar
  colors(){
    // red zone
    if(this.progress() >= 0 && this.progress() < 30){
      return "progress-bar-danger animated fadeInLeft";
      // yellow zone
    }else if(this.progress() > 30 && this.progress() < 70){
      return "progress-bar-warning";
    }else if(this.progress() > 70){
      return "progress-bar-success";
    }
  }

}
