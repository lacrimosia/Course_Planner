import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  providers: [DataService, HotkeysService]
})
export class DownloadComponent implements OnInit {

  @Input() data;
  @Input() amount;
  @Input() assignments;

  constructor() { }

  ngOnInit() {
  }

  printPdf(){
    let doc = new jsPDF('portrait','pt','a4');
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
   for(let x=1; x<this.assignments.length-3; x++){
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
      doc.text(40, startingPointVal, this.assignments[x].title);

      // add the due image
      if(this.assignments[x].due){
        doc.addImage(this.assignments[x].due, 'JPEG', 460, (x*start)-20, imageThumb, imageThumb);
      }

      // add image
      if(this.assignments[x].percentage=="10.png"){
        doc.addImage(tenPercent, 'JPEG', 500, (x*start)-20, imageThumb, imageThumb);
      }else{
        doc.addImage(twentyPercent, 'JPEG', 500, (x*start)-20, imageThumb, imageThumb);
      }
      // check which to display on the pdf
      // if task is A, B or nothing selected
      if(this.assignments[x].type=="two" || this.assignments[x].type=="one"){
        if(this.assignments[x].taskA.selectA==true){
          optionName = doc.splitTextToSize("Option A", textWidth);
          splitTitle = doc.splitTextToSize(this.assignments[x].taskA.information, textWidth);
        }else if(this.assignments[x].taskB.selectB==true){
          optionName = doc.splitTextToSize("Option B", textWidth);
          splitTitle = doc.splitTextToSize(this.assignments[x].taskB.information, textWidth);
        }else{
          optionName = doc.splitTextToSize("Option not selected", textWidth);
          splitTitle = doc.splitTextToSize("No task selected :(", textWidth);
        }
      }
      // set the information
      doc.setFontSize(10);

      // only show checkmark if an option is selected
    if(this.assignments[x].type=="two" || this.assignments[x].type=="one"){
      if(this.assignments[x].taskA.selectA==true || this.assignments[x].taskB.selectB==true){
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
  }
  // the second page
  // from number 7 to 8
  doc.addPage();

  // this is number 7 and 8 on the second page
  doc.setFontSize(20);
  doc.text(20, 50, "ENV 498 Capstone Planner");

  for(let x=6; x<this.assignments.length-1; x++){
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
     doc.text(40, startingPointVal, this.assignments[x].title);

     // add the due image
     if(this.assignments[x].due){
       doc.addImage(this.assignments[x].due, 'JPEG', 460, startingPointVal-20, imageThumb, imageThumb);
     }

     if(this.assignments[x].percentage=="10.png"){
       doc.addImage(tenPercent, 'JPEG', 500, startingPointVal-20, imageThumb, imageThumb);
     }else{
       doc.addImage(twentyPercent, 'JPEG', 500, startingPointVal-20, imageThumb, imageThumb);
     }

     // set the information
     doc.setFontSize(10);

     // check which to display on the pdf
     // if task is A, B or nothing selected
     if(this.assignments[x].type=="two" || this.assignments[x].type=="one"){
       if(this.assignments[x].taskA.selectA==true){
         optionName = doc.splitTextToSize("Option A", textWidth);
         splitTitle = doc.splitTextToSize(this.assignments[x].taskA.information, textWidth);
       }else if(this.assignments[x].taskB.selectB==true){
         optionName = doc.splitTextToSize("Option B", textWidth);
         splitTitle = doc.splitTextToSize(this.assignments[x].taskB.information, textWidth);
       }else{
         optionName = doc.splitTextToSize("Option not selected", textWidth);
         splitTitle = doc.splitTextToSize("No task selected :(", textWidth);
       }
     }
     // set the information
     doc.setFontSize(10);

     // only show checkmark if an option is selected
   if(this.assignments[x].type=="two" || this.assignments[x].type=="one" || this.assignments[x].type=="custom"){
     if(this.assignments[x].taskA.selectA==true || this.assignments[x].taskB.selectB==true){
       doc.addImage(info.checkmark, 'JPEG', 40, startingPointVal + 12, imageThumb-30, imageThumb-30);
       doc.setTextColor(0,0,0);
       doc.text(54, (startingPointVal + 20), optionName);
     }else if(this.assignments[x].taskA.selectA==true && this.assignments[x].taskB.selectB==true){
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

     doc.setTextColor(77,77,77);
     doc.text(60, (startingPointVal + 40), splitTitle);
   }
    doc.save('ENV498_Planner.pdf');
  }


}
