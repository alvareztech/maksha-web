import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentLab = {steps: []};
  currentStep = {};
  isSaveLab = true; // update otherwise

  labsPreview: FirebaseListObservable<any>;
  lab: FirebaseObjectObservable<any>;

  currentStepNumber = 0;

  constructor(private technologyService: TechnologyService, private af: AngularFire) {
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
    // this.lab.update({
    //   technology: 'ios'
    // });
  }

  goLab(id: string) {
    console.log('Id ' + id + ' pressed');

    this.isSaveLab = false;
    this.lab = this.af.database.object('/labs/' + id);
    this.lab.forEach(value => {
      console.log('Lab: %j', value);
      this.currentLab = value;
      this.currentStep = value.steps[0];
      this.currentStepNumber = 1;
    });
  }

  newStep() {
    console.log('newStep()');
    this.currentStepNumber = this.currentLab.steps.length + 1;
    this.currentLab.steps.push({
      title: 'Nuevo título'
    });
  }

  setStep(position: number) {
    console.log('setStep():' + position);
    this.currentStepNumber = position;
    this.currentStep = this.currentLab.steps[this.currentStepNumber];
  }

  // const article = this.af.database.list('articles');
  // article.update(this.article.link, this.article);

}
