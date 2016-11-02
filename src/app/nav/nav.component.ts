import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [DataService, HotkeysService]
})
export class NavComponent implements OnInit {
	@Input() d:number = 0;
  @Input() assignments;
  @Input() data;
	public selected:boolean;
  @Input() amount;
  public content;
  public contentList;
  public print;
  value:number = 0;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) {
  	// this.dataService = dataService;
  	this.value = 0;
  	this.selected = false;
    this.contentList = [];
    this.print = false;
  }

  ngOnInit() {
    // left keyboard shortcut
    this._hotkeysService.add(new Hotkey('right', (event: KeyboardEvent): boolean => {
         //this.goTo();
         if(this.value >= 0 && this.value < (this.amount - 1)){
           this.value++;
         }
         if(this.value == this.assignments.length-1){
           this.printContent();
         }else{
           this.hidePrintContent();
         }
        return false; // Prevent bubbling
    }));

// right keyboard shortcut
    this._hotkeysService.add(new Hotkey('left', (event: KeyboardEvent): boolean => {
      if(this.value > 0 && this.value < (this.amount)){
        this.value--;
      }
      if(this.value == this.assignments.length-1){
        this.printContent();
      }else{
        this.hidePrintContent();
      }
        return false; // Prevent bubbling
    }));

    // help keyboard shortcut
        this._hotkeysService.add(new Hotkey('h', (event: KeyboardEvent): boolean => {
          this.help();
            return false; // Prevent bubbling
        }));

// The print keyboard shorcut
        this._hotkeysService.add(new Hotkey('p', (event: KeyboardEvent): boolean => {
          this.print = !this.print;
            return false; // Prevent bubbling
        }));

        // select A for the option A task
            this._hotkeysService.add(new Hotkey('a', (event: KeyboardEvent): boolean => {
              if(this.assignments[this.value].type=="two"){
                this.buttonOneClick();
              }
                return false; // Prevent bubbling
            }));

            // select B for the option B task
                this._hotkeysService.add(new Hotkey('b', (event: KeyboardEvent): boolean => {
                  if(this.assignments[this.value].type=="two"){
                    this.buttonTwoClick();
                  }
                    return false; // Prevent bubbling
                }));

  }

  // go to link onclick
  goTo(value){
  	this.value = value;
    if(value == this.assignments.length-1){
      this.printContent();
    }else{
      this.hidePrintContent();
    }
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
    if(this.value == this.assignments.length-1){
      this.data.print = true;
    }else{
      this.data.print = false;
    }
  }

  // Prev button
  prev(value){
  	this.value = value;
  	this.value--;
    if(this.value < this.assignments.length-1){
      this.data.print = false;
    }
  }

// help button
  help(){
    this.value = 0;
    this.print = false;
  }


printContent(){
  this.print = true;
  this.data.print = true;
}

hidePrintContent(){
  this.print = false;
  this.data.print = false;
}

buttonOneClick(){
  this.data.assignments[this.value].taskA.selectA = !this.data.assignments[this.value].taskA.selectA;
  this.data.assignments[this.value].taskB.selectB=false;
}

buttonTwoClick(){
  this.data.assignments[this.value].taskB.selectB = !this.data.assignments[this.value].taskB.selectB;
  this.data.assignments[this.value].taskA.selectA=false;
}

taskSelected(task){
  return task;
}


}
