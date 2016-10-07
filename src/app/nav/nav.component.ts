import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService} from 'angular2-hotkeys';
import {Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [DataService, HotkeysService]
})
export class NavComponent implements OnInit {
	public data;
	public value:number;
	public selected:boolean;
  public amount: number;
  public content;
  public contentList;
  public print;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) {
  	// this.dataService = dataService;
  	this.value = this.dataService.value;
  	this.selected = false;
    this.contentList = [];
    this.print = false;
  }

  ngOnInit() {
  this.data = this.dataService.getData()
    .subscribe(
       data => {
        this.data = data;
        this.amount = this.data.assignments.length;
      //  console.log("the data list", this.amount);
       },
       err => console.error(err),
       () => console.log('nav data loaded')

    );



    // left keyboard shortcut
    this._hotkeysService.add(new Hotkey('right', (event: KeyboardEvent): boolean => {
         //this.goTo();
         if(this.value >= 0 && this.value < (this.amount - 1)){
           this.value++;
         }else{
           this.value = 0;
         }

        return false; // Prevent bubbling
    }));

// right keyboard shortcut
    this._hotkeysService.add(new Hotkey('left', (event: KeyboardEvent): boolean => {
      if(this.value > 0 && this.value < (this.amount)){
        this.value--;
      }
        return false; // Prevent bubbling
    }));

    // help keyboard shortcut
        this._hotkeysService.add(new Hotkey('h', (event: KeyboardEvent): boolean => {
          this.help();
            return false; // Prevent bubbling
        }));

  }

  // go to link onclick
  goTo(value){
  	this.value = value;
  	return this.value;
  }

  // show the correct picture
  imageSrc(picture){
  	return "../../assets/images/" + picture;
  }

// reload function
reload(){
  location.reload();
}

  // next button
  next(value){
  	this.value = value;
  	this.value++;
  }

  // Prev button
  prev(value){
  	this.value = value;
  	this.value--;
  }

// help button
  help(){
    this.value = 0;
  }

// add selections to printing array
addSelections(selected, title, option, description, index){
  if(selected==true){
    this.content = {
      Title: title,
      Option: option,
      Description: description
    };
    this.contentList.push(this.content);
    console.log("button selected", selected);
  }else{
    this.contentList.pop();
  }
}

printContent(){
  this.print = true;
}

hidePrintContent(){
  this.print = false;
}

}
