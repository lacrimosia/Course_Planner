import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-button-b',
  templateUrl: './button-b.component.html',
  styleUrls: ['./button-b.component.scss'],
  providers: [DataService, HotkeysService]
})
export class ButtonBComponent implements OnInit {
  @Input() assignments;
  @Input() data;
  @Input() amount;
  @Input() value:number = 0;
  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
    // select B for the option B task
      this._hotkeysService.add(new Hotkey('b', (event: KeyboardEvent): boolean => {
          if(this.assignments[this.value].type=="two"){
              this.buttonTwoClick(this.value);
              return;
          }
          return false; // Prevent bubbling
      }));
  }

  buttonTwoClick(value){
    console.log("value B", value);
    this.data.assignments[value].taskB.selectB = true;
    this.data.assignments[value].taskA.selectA = false;
    return;
  }

}
