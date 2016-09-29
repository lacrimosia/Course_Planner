import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  providers: [DataService]
})
export class TitleComponent implements OnInit {
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
       () => console.log('tile and information loaded')
    );

  }

  reload(){
  	location.reload();
  }

}
