import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs/Rx';
import {KeysPipe} from '../keys.pipe';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-course-name',
  templateUrl: './course-name.component.html',
  styleUrls: ['./course-name.component.scss'],
  providers: [DataService, HotkeysService]
})
export class CourseNameComponent implements OnInit {
  @Input() data;
  @Input() courseName;

  constructor(private dataService: DataService, private _hotkeysService: HotkeysService) { }

  ngOnInit() {
  }

}
