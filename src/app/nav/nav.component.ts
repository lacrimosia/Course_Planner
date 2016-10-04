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

	public dataInfo;
	public data;

  constructor(private dataService: DataService) {
  	this.dataService = dataService; 
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

}
