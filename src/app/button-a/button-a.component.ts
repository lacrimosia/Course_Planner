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
  @Input() assignments;
  @Input() data;
  @Input() amount;
  @Input() value;
  @Input() d;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) {
  }

  ngOnInit() {
    // select A for the option A task
    this._hotkeysService.add(new Hotkey('a', (event: KeyboardEvent): boolean => {
        if(this.d.value.type=="two"){
            this.buttonOneClick();
            return;
        }
        return false; // Prevent bubbling
    }));
  }

  // toggle buttons for selection
  buttonOneClick(){
  //  console.log("value A", this.d);
    this.d.value.selected++;
    this.d.value.taskA.selectA = true;
    this.d.value.taskB.selectB= false;
    if(this.d.value.selected == 1){
      this.data.progress++;
    }
    return;
  }

}
