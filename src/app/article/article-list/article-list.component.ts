import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.articles = db.list('/previews/articles', {
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
