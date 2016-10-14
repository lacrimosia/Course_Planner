import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
// import {jsPDF} from 'jspdf';


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
    this.print = false;
  }


printContent(){
  this.print = true;
}

hidePrintContent(){
  this.print = false;
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

/*toPdf(){
    let doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(20, 20, 'This is a title');

    doc.setFontSize(16);
    doc.text(20, 30, 'This is some normal sized text underneath.');

    doc.save('Test.pdf');
}*/

}
