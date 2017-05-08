import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentLab = {
    $key: '',
    title: '',
    level: 0,
    technology: '',
    published: false,
    steps: []
  };
  currentStep = {
    title: '',
    content: ''
  };
  isNewLab = true; // update otherwise
  isNewArticle = true; // update otherwise

  currentArticle = {};

  lab: FirebaseObjectObservable<any>;
  labs: FirebaseListObservable<any>;
  article: FirebaseObjectObservable<any>;
  articles: FirebaseListObservable<any>;

  currentStepNumber = 0;

  isLabSelected = false;
  isArticleSelected = false;

  constructor(public technologyService: TechnologyService, private db: AngularFireDatabase, public snackBar: MdSnackBar) {
    this.labs = db.list('/labs');
    this.articles = db.list('/articles');
  }

  ngOnInit() {
  }

  // Labs methods

  saveLab() {
    this.currentLab.steps[this.currentStepNumber] = this.currentStep;
    this.currentLab['updated'] = firebase.database.ServerValue.TIMESTAMP;

    this.labs.update(this.currentLab['$key'], {
      title: this.currentLab['title'],
      updated: firebase.database.ServerValue.TIMESTAMP,
      technology: this.currentLab['technology'],
      level: +this.currentLab['level'],
      published: false,
      steps: [{
        title: 'Resumen',
        content: 'Resumen \n\n## Aprenderás\n\n* Primero\n\n## Requisitos\n\n* Otro'
      }]
    }).then(a => {
      this.snackBar.open('New lab successfully saved!', null, {duration: 2000});
    });
  }

  updateLab() {
    this.currentLab.steps[this.currentStepNumber] = this.currentStep;
    this.currentLab['updated'] = firebase.database.ServerValue.TIMESTAMP;

    this.currentLab['level'] = +this.currentLab['level'];
    this.lab.update(this.currentLab).then(a => {
      this.snackBar.open('Lab successfully updated!', null, {duration: 2000});
    });
  }

  goLab(o: any) {
    this.isLabSelected = true;
    this.isNewLab = false;

    this.lab = this.db.object('/labs/' + o.$key);

    this.lab.forEach(value => {
      console.log('Lab: %j', value);
      this.currentLab = value;
      this.currentStep = value.steps[0];
      this.currentStepNumber = 0;
    });
  }

  newStep() {
    console.log('newStep()');
    this.currentLab.steps.push({
      title: 'Nuevo título'
    });
    this.currentStepNumber = this.currentLab.steps.length - 1;
    this.currentStep = this.currentLab.steps[this.currentStepNumber];
  }

  setStep(position: number) {
    console.log('setStep():' + position);
    this.currentStepNumber = position;
    this.currentStep = this.currentLab.steps[this.currentStepNumber];
  }

  newLab() {
    this.isLabSelected = true;
    this.isNewLab = true;
    this.currentStepNumber = 0;
    this.currentLab = {
      $key: '',
      title: 'New',
      level: 1,
      technology: '',
      published: false,
      steps: []
    };
    this.currentStep = {
      title: 'Resumen',
      content: ''
    };
  }

  returnLabs() {
    this.isLabSelected = false;
  }

  // Articles methods

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
      updated: firebase.database.ServerValue.TIMESTAMP
    }).then(a => {
      this.snackBar.open('Article successfully updated!', null, {duration: 2000});
    }).catch(a => {
      this.snackBar.open('Error:' + a.message, null, {duration: 2000});
    });
  }

  goArticle(art: any) {
    this.isArticleSelected = true;
    this.isNewArticle = false;

    this.article = this.db.object('/articles/' + art.$key);
    this.article.subscribe(a => {
      console.log('Llego art: ', a);
      this.currentArticle = a;
    });
  }

  goNewArticle() {
    this.isArticleSelected = true;
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
  }

}
