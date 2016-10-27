import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import * as google from 'googleapis';
import * as googleAuth from 'google-auth-library';
import * as jsPDF from 'jspdf';
import * as fs from 'file-system';
import * as readline from 'readline';
// import { AuthenticationService } from '../authentication.service';
// import * as gapi from 'gapi';

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

printPdf(){
  let doc = new jsPDF('portrait','pt','a4');
  let data = this.assignments;
  let info = this.data;
  let start = 130;
  let textWidth = 700;
  let imageThumb = 40;
  let splitTitle, optionName;

  // images for percentage of either 10% or 20%
  let tenPercent = info.ten;
  let twentyPercent = info.twenty;

  doc.setFontSize(20);
  doc.text(20, 50, "ENV 498 Capstone Planner");

// first page
// this is numbers 1 - 5
 for(let x=1; x<data.length-3; x++){
    doc.setFontSize(16);
    let startingPointVal = (x*start);

    // green shape ellipse
    doc.setFillColor(159,186,143);
    doc.ellipse(20, startingPointVal-5, 10, 10, 'F');
    // The number of the item inside of the ellipse
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(16, startingPointVal, x.toString());

    // title information
    doc.setTextColor(96,125,139);
    doc.text(40, startingPointVal, data[x].title);

    // add the due image
    if(data[x].due){
      doc.addImage(data[x].due, 'JPEG', 460, (x*start)-20, imageThumb, imageThumb);
    }

    // add image
    if(data[x].percentage=="10.png"){
      doc.addImage(tenPercent, 'JPEG', 500, (x*start)-20, imageThumb, imageThumb);
    }else{
      doc.addImage(twentyPercent, 'JPEG', 500, (x*start)-20, imageThumb, imageThumb);
    }
    // check which to display on the pdf
    // if task is A, B or nothing selected
      if(data[x].taskA.selectA==true){
        optionName = doc.splitTextToSize("Option A", textWidth);
        splitTitle = doc.splitTextToSize(data[x].taskA.information, textWidth);
      }else if(data[x].taskB.selectB==true){
        optionName = doc.splitTextToSize("Option B", textWidth);
        splitTitle = doc.splitTextToSize(data[x].taskB.information, textWidth);
      }else{
        optionName = doc.splitTextToSize("Option not selected", textWidth);
        splitTitle = doc.splitTextToSize("No task selected :(", textWidth);
      }
    // set the information
    doc.setFontSize(10);

    // only show checkmark if an option is selected
    if(data[x].taskA.selectA==true || data[x].taskB.selectB==true){
      doc.addImage(info.checkmark, 'JPEG', 40, startingPointVal + 12, imageThumb-30, imageThumb-30);
      doc.setTextColor(0,0,0);
      doc.text(54, (startingPointVal + 20), optionName);
    }else{
      doc.setTextColor(0,0,0);
      doc.text(50, (startingPointVal + 20), optionName);
    }

    doc.setTextColor(77,77,77);
    doc.text(60, (startingPointVal + 40), splitTitle);
  }

// the second page
// from number 7 to 8
doc.addPage();

// this is number 7 and 8 on the second page
doc.setFontSize(20);
doc.text(20, 50, "ENV 498 Capstone Planner");

for(let x=6; x<data.length; x++){
   doc.setFontSize(16);
   let startingPointVal = ((x-5)*start);

   // green shape ellipse
   doc.setFillColor(159,186,143);
   doc.ellipse(20, startingPointVal-5, 10, 10, 'F');
   // The number of the item inside of the ellipse
   doc.setTextColor(255, 255, 255);
   doc.setFontSize(14);
   doc.text(16, startingPointVal, x.toString());


   // title information
   doc.setTextColor(96,125,139);
   doc.text(40, startingPointVal, data[x].title);

   // add the due image
   if(data[x].due){
     doc.addImage(data[x].due, 'JPEG', 460, startingPointVal-20, imageThumb, imageThumb);
   }

   if(data[x].percentage=="10.png"){
     doc.addImage(tenPercent, 'JPEG', 500, startingPointVal-20, imageThumb, imageThumb);
   }else{
     doc.addImage(twentyPercent, 'JPEG', 500, startingPointVal-20, imageThumb, imageThumb);
   }

   // check which to display on the pdf
   // if task is A, B or nothing selected
   if(data[x].taskA.selectA==true){
     optionName = doc.splitTextToSize("Option A", textWidth);
     splitTitle = doc.splitTextToSize(data[x].taskA.information, textWidth);
   }else if(data[x].taskB.selectB==true){
     optionName = doc.splitTextToSize("Option B", textWidth);
     splitTitle = doc.splitTextToSize(data[x].taskB.information, textWidth);
   }else{
     optionName = doc.splitTextToSize("Option not selected", textWidth);
     splitTitle = doc.splitTextToSize("No task selected :(", textWidth);
   }
   // set the information
   doc.setFontSize(10);

   // only show checkmark if an option is selected
   // only show checkmark if an option is selected
   if(data[x].taskA.selectA==true || data[x].taskB.selectB==true){
     doc.addImage(info.checkmark, 'JPEG', 40, startingPointVal + 12, imageThumb-30, imageThumb-30);
     doc.setTextColor(0,0,0);
     doc.text(54, (startingPointVal + 20), optionName);
   }else{
     doc.setTextColor(0,0,0);
     doc.text(54, (startingPointVal + 20), optionName);
   }

   doc.setTextColor(77,77,77);
   doc.text(60, (startingPointVal + 40), splitTitle);
 }
  doc.save('ENV498_Planner.pdf');
}

}
