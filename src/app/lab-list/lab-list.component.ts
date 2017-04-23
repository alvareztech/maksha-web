import {Component, OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {TechnologyService} from '../services/technology.service';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit {

  labsPreview: FirebaseListObservable<any>;

  constructor(af: AngularFire, private technologyService: TechnologyService) {
    this.labsPreview = af.database.list('/previews/labs', {
      query: {
        orderByChild: 'updated'
      }
    });
  }

  ngOnInit() {
  }

}
