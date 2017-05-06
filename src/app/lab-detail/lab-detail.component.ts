import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params} from '@angular/router';
import {TechnologyService} from '../services/technology.service';

import {Title} from '@angular/platform-browser';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {

  lab: FirebaseObjectObservable<any>;
  currentStepNumber: number;
  totalStepsNumber: number;
  currentStep = {
    title: '',
    content: ''
  };
  labObject = {
    title: '',
    steps: []
  };

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
              public technologyService: TechnologyService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      console.log('Params:' + params['id']);
      this.lab = this.db.object('/labs/' + params['id']);
      this.lab.forEach(value => {
        console.log('Lab: %j', value);
        this.titleService.setTitle(value.title);

        this.labObject = value;
        this.currentStep = this.labObject.steps[0];
        this.currentStepNumber = 0;
        this.totalStepsNumber = this.labObject.steps.length;
      });
    });
  }

  changeStep(i: number) {
    this.currentStepNumber = i;
    this.currentStep = this.labObject.steps[this.currentStepNumber];
  }

  goNextStep() {
    this.currentStepNumber++;
    this.currentStep = this.labObject.steps[this.currentStepNumber];
  }

}
