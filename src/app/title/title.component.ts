import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  providers: [DataService]
})
export class TitleComponent implements OnInit {
	public titleData;

  constructor(private dataService: DataService) {
  	this.dataService = dataService; 
  }

  ngOnInit() {

  	this.titleData = this.dataService.getData()
    .subscribe(
       data => {
        this.titleData = data;
       },
       err => console.error(err),
       () => console.log('tile and information loaded')
    );

  }

  reload(){
  	location.reload();
  }

}
