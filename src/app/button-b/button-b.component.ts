import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import * as jsPDF from 'jspdf';

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
              this.buttonTwoClick();
          }
          return false; // Prevent bubbling
      }));
  }

  buttonTwoClick(){
    this.data.assignments[this.value].taskB.selectB = true;
    this.data.assignments[this.value].taskA.selectA=false;
  }

}
