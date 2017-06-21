import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {TechnologyService} from '../../services/technology.service';
import {MdSnackBar} from '@angular/material';
import {Title} from '@angular/platform-browser';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.css']
})
export class AdminArticlesComponent implements OnInit {

  @Output() onArticleSelected = new EventEmitter<boolean>();
  isArticleSelected = false;

  article: FirebaseObjectObservable<any>;
  articles: FirebaseListObservable<any>;

  currentArticle = {};
  isNewArticle = true; // update otherwise

  constructor(public technologyService: TechnologyService,
              private db: AngularFireDatabase,
              public snackBar: MdSnackBar,
              private titleService: Title) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.articles = this.db.list('/articles', {
      query: {
        orderByChild: 'updated'
      }
    });
  }

  saveArticle() {
    this.articles.update(this.currentArticle['$key'], {
      title: this.currentArticle['title'],
      content: this.currentArticle['content'],
      updated: firebase.database.ServerValue.TIMESTAMP,
      created: firebase.database.ServerValue.TIMESTAMP,
    }).then(a => {
      this.snackBar.open('New article successfully saved!', null, {duration: 2000});
    }).catch(a => {
      this.snackBar.open('Error:' + a.message, null, {duration: 2000});
    });
  }

  updateArticle() {
    this.articles.update(this.currentArticle['$key'], {
      title: this.currentArticle['title'],
      content: this.currentArticle['content'],
      published: this.currentArticle['published'],
      updated: firebase.database.ServerValue.TIMESTAMP,
      coverUrl: this.currentArticle['coverUrl']
    }).then(a => {
      this.snackBar.open('Article successfully updated!', null, {duration: 2000});
    }).catch(a => {
      this.snackBar.open('Error:' + a.message, null, {duration: 2000});
    });
  }

  goArticle(art: any) {
    this.isArticleSelected = true;
    this.onArticleSelected.emit(true);

    this.isNewArticle = false;

    this.article = this.db.object('/articles/' + art.$key);
    this.article.subscribe(result => {
      this.currentArticle = result;
      if (!this.currentArticle['published']) {
        this.currentArticle['published'] = false;
      }
    });
  }

  goNewArticle() {
    this.isArticleSelected = true;
    this.onArticleSelected.emit(true);

    this.isNewArticle = true;

    this.currentArticle = {
      $key: '',
      title: 'New article',
      published: false,
      content: 'Any content'
    };
  }

  returnArticles() {
    this.isArticleSelected = false;
    this.onArticleSelected.emit(false);
  }

}
