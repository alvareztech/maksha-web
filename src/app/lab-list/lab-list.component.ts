import {Component, OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit {

  items: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.items = af.database.list('/labs-preview');
  }

  ngOnInit() {
  }

}
