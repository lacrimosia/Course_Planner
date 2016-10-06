import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [DataService]
})
export class NavComponent implements OnInit {
	public data;
	public value:number;

  constructor(private dataService: DataService) {
  	this.dataService = dataService; 
  	this.value = 0;
  }

  ngOnInit() {
    this.data = this.dataService.getData()
    .subscribe(
       data => {
        this.data = data;
       },
       err => console.error(err),
       () => console.log('nav data loaded')
    );
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

}
