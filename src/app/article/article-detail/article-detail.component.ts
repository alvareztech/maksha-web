import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: FirebaseObjectObservable<any>;
  articleObject = {
    title: '',
    content: ''
  };

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
              private titleService: Title) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.article = this.db.object('/articles/' + params['id']);
      this.article.forEach(value => {
        this.titleService.setTitle(value.title);
        this.articleObject = value;
      });
    });
  }

}
