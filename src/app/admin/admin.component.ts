import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  successMessage = '';
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

  lab: FirebaseObjectObservable<any>;
  labs: FirebaseListObservable<any>;

  currentStepNumber = 0;

  isLabSelected = false;

  constructor(public technologyService: TechnologyService, private af: AngularFire) {
    this.labs = af.database.list('/labs');
  }

  ngOnInit() {
  }

  saveLab() {
    this.currentLab.steps[this.currentStepNumber] = this.currentStep;
    console.log('saveLab(): %j', this.currentLab);
    this.currentLab['updated'] = new Date().getTime();
    // this.successMessage = 'Se guardo correctamente';
    if (this.isNewLab) {
      this.labs.update(this.currentLab['$key'], {
        title: this.currentLab['title'],
        updated: new Date().getTime(),
        technology: this.currentLab['technology'],
        level: +this.currentLab['level'],
        published: false,
        steps: [{
          title: 'Resumen',
          content: 'Resumen \n\n## Aprenderás\n\n* Primero\n\n## Requisitos\n\n* Otro'
        }]
      });
    } else {
      this.currentLab['level'] = +this.currentLab['level'];
      this.lab.update(this.currentLab);
    }
  }

  goLab(o: any) {
    console.log('Id ' + o.$key + ' pressed');

    this.isLabSelected = true;

    this.isNewLab = false;
    this.lab = this.af.database.object('/labs/' + o.$key);

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

}
