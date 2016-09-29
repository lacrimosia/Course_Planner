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
	public dataInfo;

  constructor(private dataService: DataService) {
  	this.data = dataService; 
  }

  ngOnInit() {

  	this.dataInfo = this.dataService.getData()
    .subscribe(
       data => {
        this.dataInfo = data;
       },
       err => console.error(err),
       () => console.log('dataList loaded')
    );
  }

}
