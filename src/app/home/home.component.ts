import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  labsPreview: FirebaseListObservable<any>;
  articlesPreview: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.labsPreview = af.database.list('/previews', {
      query: {
        orderByChild: 'category',
        equalTo: 'lab',
        limitToFirst: 3
      }
    });
    this.articlesPreview = af.database.list('/previews', {
      query: {
        orderByChild: 'category',
        equalTo: 'article',
        limitToFirst: 3
      }
    });
  }

  ngOnInit() {
  }

}
