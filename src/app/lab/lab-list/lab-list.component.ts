import {Component, OnInit} from '@angular/core';

import {TechnologyService} from '../../services/technology.service';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit {

  labsPreview: Observable<any>;

  constructor(db: AngularFireDatabase, private technologyService: TechnologyService, private titleService: Title) {
    this.titleService.setTitle('Labs');
    this.labsPreview = db.list('/previews/labs', {
      query: {
        orderByChild: 'updated'
      }
    }).map((arr) => {
      return arr.reverse();
    });
  }

  ngOnInit() {
  }

}
