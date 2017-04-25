import {Component, OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {TechnologyService} from '../services/technology.service';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit {

  labsPreview: Observable<any>;

  constructor(af: AngularFire, private technologyService: TechnologyService) {
    this.labsPreview = af.database.list('/previews/labs', {
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
