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
  counter:number = 0;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

// keeps track of progress
  progress(){
    this.counter = this.data.progress;
    // if type one task or custom task, automatically increment the progress
    console.log("type", this.assignments[this.data.value].type);
    if(this.assignments[this.data.value].type=="one"){
      if(this.assignments[this.data.value].selected == 1){
        this.counter++;
      }
    }else if(this.assignments[this.data.value].type=="custom"){
      if(this.assignments[this.data.value].selected == 1){
        this.counter++;
      }
    }else{
      this.counter++;
    }
    console.log("process amount", this.data.progress);
    return Math.round(this.counter * 14.28);
  }

// shows the colors for the progress bar
  colors(){
    // red zone
    /*if(this.progress() >= 0 && this.progress() < 15){
      return "progress-bar-danger animated fadeInLeft";
    }
    else if(this.progress() > 15 && this.progress() < 30){
      return "progress-bar-danger";
      // yellow zone
    }else if(this.progress() > 30 && this.progress() < 70){
      return "progress-bar-warning";
    }else if(this.progress() > 70){
      return "progress-bar-success";
    }
  }*/
  return "glow";
}

}
