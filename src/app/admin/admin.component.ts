import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

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
    steps: []
  };
  currentStep = {
    title: '',
    content: ''
  };
  isSaveLab = true; // update otherwise

  labsPreview: FirebaseListObservable<any>;
  lab: FirebaseObjectObservable<any>;
  labPreview: FirebaseObjectObservable<any>;

  currentStepNumber = 0;

  constructor(public technologyService: TechnologyService, private af: AngularFire) {
    this.labsPreview = af.database.list('/previews', {
      query: {
        orderByChild: 'category',
        equalTo: 'lab'
      }
    });
  }

  ngOnInit() {
  }

  saveLab() {
    this.currentLab.steps[this.currentStepNumber] = this.currentStep;
    console.log('saveLab(): %j', this.currentLab);
    this.currentLab['updated'] = new Date().getTime();
    this.lab.update(this.currentLab);
    this.labsPreview.update(this.currentLab['$key'], {
      title: this.currentLab['title'],
      category: 'lab',
      updated: new Date().getTime(),
      technology: this.currentLab['technology']
    });
  }

  goLab(o: any) {
    console.log('Id ' + o.$key + ' pressed');

    this.isSaveLab = false;
    this.lab = this.af.database.object('/labs/' + o.$key);
    this.labPreview = this.af.database.object('/previews/' + o.$key);

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

  // const article = this.af.database.list('articles');
  // article.update(this.article.link, this.article);

}
