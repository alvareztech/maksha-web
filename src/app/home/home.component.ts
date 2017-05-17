import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  labsPreview: Observable<any>;
  articlesPreview: Observable<any>;

  constructor(db: AngularFireDatabase, private technologyService: TechnologyService) {
    this.labsPreview = db.list('/previews/labs', {
      query: {
        orderByChild: 'updated',
        limitToLast: 3
      }
    }).map((arr) => {
      return arr.reverse();
    });
    this.articlesPreview = db.list('/previews/articles', {
      query: {
        orderByChild: 'updated',
        limitToLast: 3
      }
    }).map((arr) => {
      return arr.reverse();
    });
  }

  ngOnInit() {
  }

}
