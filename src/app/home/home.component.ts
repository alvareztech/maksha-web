import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  labsPreview: FirebaseListObservable<any>;
  articlesPreview: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase, private technologyService: TechnologyService) {
    this.labsPreview = db.list('/previews/labs', {
      query: {
        orderByChild: 'updated',
        limitToFirst: 3
      }
    });
    this.articlesPreview = db.list('/previews/articles', {
      query: {
        orderByChild: 'updated',
        limitToFirst: 3
      }
    });
  }

  ngOnInit() {
  }

  goLabs() {

  }

  goArticles() {

  }

}
