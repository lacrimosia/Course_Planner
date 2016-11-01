import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  providers: [DataService, HotkeysService]
})
export class TitleComponent implements OnInit {
  @Input() data;
  @Input() amount;
  @Input() d:number;
  @Input() assignments;
  value: number;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) {
  }

  ngOnInit() {
    // refresh the app
    this._hotkeysService.add(new Hotkey('r', (event: KeyboardEvent): boolean => {
        this.reload();
        return false; // Prevent bubbling
    }));

    // go back to screen one for help without refresh
    this._hotkeysService.add(new Hotkey('h', (event: KeyboardEvent): boolean => {
        this.help();
        return false; // Prevent bubbling
    }));

  }

  reload(){
  	location.reload();
  }

  help(){
    this.value = 0;
    return this.value;
  }

}
