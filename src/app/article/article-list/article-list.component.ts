import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Observable<any>;

  constructor(db: AngularFireDatabase, private titleService: Title) {
    this.titleService.setTitle('Artículos');
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
