import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-button-a',
  templateUrl: './button-a.component.html',
  styleUrls: ['./button-a.component.scss'],
  providers: [DataService, HotkeysService]
})
export class ButtonAComponent implements OnInit {
  @Input() d:number;
  @Input() assignments;
  @Input() data;
	selected:boolean;
  @Input() amount;
  @Input() value;
  textSelected: string;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) {
  }

  ngOnInit() {
    // select A for the option A task
    this._hotkeysService.add(new Hotkey('a', (event: KeyboardEvent): boolean => {
        if(this.assignments[this.value].type=="two"){
            this.buttonOneClick(this.value);
            return;
        }
        return false; // Prevent bubbling
    }));
  }

  // toggle buttons for selection
  buttonOneClick(value){
    console.log("value A", value);
    this.data.assignments[value].taskA.selectA = true;
    this.data.assignments[value].taskB.selectB= false;
    return;
  }

}