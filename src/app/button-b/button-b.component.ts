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
  @Input() d;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
    // select B for the option B task
      this._hotkeysService.add(new Hotkey('b', (event: KeyboardEvent): boolean => {
          if(this.d.value.type=="two"){
              this.buttonTwoClick();
              return;
          }
          return false; // Prevent bubbling
      }));
  }

  buttonTwoClick(){
//  console.log("value B", this.d);
    this.d.value.selected++;
    this.d.value.taskB.selectB = true;
    this.d.value.taskA.selectA = false;
    if(this.d.value.selected == 1){
      this.data.progress++;
    }
    return;
  }

}
