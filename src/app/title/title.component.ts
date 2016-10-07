import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {HotkeysService} from 'angular2-hotkeys';
import {Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  providers: [DataService, HotkeysService]
})
export class TitleComponent implements OnInit {
	public titleData;
  public value: number;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) {
  	this.dataService = dataService;
    this.value = this.dataService.value;
  }

  ngOnInit() {

  	this.titleData = this.dataService.getData()
    .subscribe(
       data => {
        this.titleData = data;
       },
       err => console.error(err),
       () => console.log('tile and information loaded')
    );

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
