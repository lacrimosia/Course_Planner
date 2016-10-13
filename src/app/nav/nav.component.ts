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
  public assignments;

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
        this.assignments = this.data.assignments;
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
  	return "assets/images/" + picture;
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
addSelections(actual, selectedA, selectedB, title, option, description, pick, index){
  console.log("index selected", this.contentList);

  //  this.content = ;
  if(selectedA==true){
    this.contentList.push({
        Title: title,
        Option: option,
        Description: description,
        index: pick,
        due: this.data.assignments[index].due_date,
        percent: this.data.assignments[index].percentage
      });
    console.log("Selection A");
  }else{
    for(let x=0; x<this.contentList.length; x++){
      if(this.contentList[x].index === pick){
        this.contentList.splice(pick, 1);
      //  console.log("Is this working?", this.contentList[x].index === pick);
       // console.log("content List", this.contentList);
      }
    }


  if(selectedB==true){
    this.contentList.push({
        Title: title,
        Option: option,
        Description: description,
        index: pick,
        due: this.data.assignments[index].due_date,
        percent: this.data.assignments[index].percentage
      });
    console.log("Selection B");
  }else{
    for(let x=0; x<this.contentList.length; x++){
      if(this.contentList[x].index === pick){
        this.contentList.splice(pick, 1);
      //  console.log("Is this working?", this.contentList[x].index === pick);
      //  console.log("content List", this.contentList);
      }
    }
  }

  }

}

printContent(){
  if(this.contentList.length > 0){
    this.print = true;
  }else{
    this.print = false;
  }
}

hidePrintContent(){
  this.print = false;
}

}
