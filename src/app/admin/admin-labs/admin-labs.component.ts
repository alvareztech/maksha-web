import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {TechnologyService} from '../../services/technology.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-admin-labs',
  templateUrl: './admin-labs.component.html',
  styleUrls: ['./admin-labs.component.css']
})
export class AdminLabsComponent implements OnInit {

  @Output() onLabSelected = new EventEmitter<boolean>();
  isLabSelected = false;

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

  currentStepNumber = 0;

  lab: FirebaseObjectObservable<any>;
  labs: FirebaseListObservable<any>;


  user: Observable<firebase.User>;
  userObject: any;

  constructor(public technologyService: TechnologyService,
              private db: AngularFireDatabase,
              public snackBar: MdSnackBar,
              public afAuth: AngularFireAuth) {

    this.user = afAuth.authState;
    this.user.subscribe(result => {
      this.userObject = result;
      if (this.userObject && this.userObject.uid === 'VPzZ9izNNravYPUNfiBimpr7put2') {
        this.load();
      } else {
        // this.router.navigate(['/']);
      }
    });
  }

  load() {
    this.labs = this.db.list('/labs', {
      query: {
        orderByChild: 'updated'
      }
    });
  }

  ngOnInit() {
  }

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
    this.onLabSelected.emit(true);
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
    this.onLabSelected.emit(true);
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
    this.onLabSelected.emit(false);
  }

}
