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
    steps: []
  };
  currentStep = {
    title: '',
    content: ''
  };
  isNewLab = true; // update otherwise

  labPreview: FirebaseObjectObservable<any>;
  labsPreview: FirebaseListObservable<any>;
  lab: FirebaseObjectObservable<any>;
  labs: FirebaseListObservable<any>;

  currentStepNumber = 0;

  constructor(public technologyService: TechnologyService, private af: AngularFire) {
    this.labs = af.database.list('/labs');
    this.labsPreview = af.database.list('/previews/labs', {
      query: {
        orderByChild: 'technology'
      }
    });
  }

  ngOnInit() {
  }

  saveLab() {
    this.currentLab.steps[this.currentStepNumber] = this.currentStep;
    console.log('saveLab(): %j', this.currentLab);
    this.currentLab['updated'] = new Date().getTime();
    this.labsPreview.update(this.currentLab['$key'], {
      title: this.currentLab['title'],
      category: 'lab',
      updated: new Date().getTime(),
      technology: this.currentLab['technology'],
      level: this.currentLab['level']
    }).then(a => {
      this.successMessage = 'Se guardo correctamente';
    }).catch(a => {
      this.successMessage = 'Error';
    });
    if (this.isNewLab) {
      this.labs.update(this.currentLab['$key'], {
        title: this.currentLab['title'],
        updated: new Date().getTime(),
        technology: this.currentLab['technology'],
        steps: [{
          title: 'Resumen',
          content: 'Resumen \n\n## Aprenderás\n\n* Primero\n\n## Requisitos\n\n* Otro'
        }]
      });
    } else {
      this.lab.update(this.currentLab);
    }
  }

  goLab(o: any) {
    console.log('Id ' + o.$key + ' pressed');

    this.isNewLab = false;
    this.lab = this.af.database.object('/labs/' + o.$key);
    this.labPreview = this.af.database.object('/previews/labs/' + o.$key);

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
      steps: []
    };
    this.currentStep = {
      title: 'Resumen',
      content: ''
    };
  }

  toNumber() {
    this.currentLab['level'] = +this.currentLab['level'];
    console.log(this.currentLab);
  }

}
