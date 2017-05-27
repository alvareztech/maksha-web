import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {MdSnackBar} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

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
  isNewPage = true; // update otherwise

  currentArticle = {};
  currentPage = {};

  lab: FirebaseObjectObservable<any>;
  labs: FirebaseListObservable<any>;
  article: FirebaseObjectObservable<any>;
  articles: FirebaseListObservable<any>;
  page: FirebaseObjectObservable<any>;
  pages: FirebaseListObservable<any>;

  currentStepNumber = 0;

  isLabSelected = false;
  isArticleSelected = false;
  isPageSelected = false;

  user: Observable<firebase.User>;
  userObject: any;

  constructor(public technologyService: TechnologyService,
              private db: AngularFireDatabase,
              public snackBar: MdSnackBar,
              private titleService: Title,
              public afAuth: AngularFireAuth,
              private router: Router) {
    this.user = afAuth.authState;
    this.user.subscribe(result => {
      this.userObject = result;
      if (this.userObject && this.userObject.uid === 'VPzZ9izNNravYPUNfiBimpr7put2') {
        this.load();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
  }

  // Load

  load() {
    this.titleService.setTitle('Administrator');
    this.labs = this.db.list('/labs', {
      query: {
        orderByChild: 'updated'
      }
    });
    this.articles = this.db.list('/articles', {
      query: {
        orderByChild: 'updated'
      }
    });
    this.pages = this.db.list('/pages');
    this.pages.subscribe(value => {
      console.log('console: %j', value);
    });
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

  // Pages methods

  savePage() {
    this.pages.update(this.currentPage['$key'], {
      name: this.currentPage['name'],
      content: this.currentPage['content']
    }).then(a => {
      this.snackBar.open('New page successfully saved!', null, {duration: 2000});
    }).catch(a => {
      this.snackBar.open('Error:' + a.message, null, {duration: 2000});
    });
  }

  updatePage() {
    this.pages.update(this.currentPage['$key'], {
      name: this.currentPage['name'],
      content: this.currentPage['content']
    }).then(a => {
      this.snackBar.open('Page successfully updated!', null, {duration: 2000});
    }).catch(a => {
      this.snackBar.open('Error:' + a.message, null, {duration: 2000});
    });
  }

  returnPages() {
    this.isPageSelected = false;
  }

  goNewPage() {
    this.isPageSelected = true;
    // this.isNewArticle = true;

    this.currentPage = {
      $key: '',
      name: 'Page name',
      content: 'Page content'
    };
  }

  goPage(page: any) {
    this.isPageSelected = true;
    this.isNewPage = false;

    this.page = this.db.object('/pages/' + page.$key);
    this.page.subscribe(a => {
      this.currentPage = a;
    });
  }

  // Util

  isVisible(type: string) {
    if (!this.isLabSelected && !this.isArticleSelected && !this.isPageSelected) {
      return true;
    }
    if (this.isLabSelected) {
      if (type === 'art' || type === 'pag') {
        return false;
      }
      return true;
    }
    if (this.isArticleSelected) {
      if (type === 'lab' || type === 'pag') {
        return false;
      }
      return true;
    }
    if (this.isPageSelected) {
      if (type === 'lab' || type === 'art') {
        return false;
      }
      return true;
    }
    return false;
  }
}
