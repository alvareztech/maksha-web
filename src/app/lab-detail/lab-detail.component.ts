import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params} from '@angular/router';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {TechnologyService} from '../services/technology.service';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {

  lab: FirebaseObjectObservable<any>;
  currentTitle: string;
  currentContent: string;
  currentStep: number;
  labObject: object;

  constructor(private route: ActivatedRoute, private af: AngularFire, public technologyService: TechnologyService) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      console.log('Params:' + params['id']);
      this.lab = this.af.database.object('/labs/' + params['id']);
      this.lab.forEach(value => {
        console.log('LabDetail: %j', value);
        this.labObject = value;
        const step = value.steps[0];
        this.currentStep = 0;
        this.currentTitle = step.title;
        this.currentContent = step.content;
      });
    });
  }

  changeStep(i: number, title: string, content: string) {
    console.log('step selected: ' + i);
    this.currentStep = i;
    this.currentTitle = title;
    this.currentContent = content;
  }

  goNextStep() {
    console.log('goNextStep pressed: %j', this.labObject);
    // const step = value.steps[0];
    // this.currentStep = 0;
    // this.currentTitle = step.title;
    // this.currentContent = step.content;
    // const step = this.labObject.steps[0];
  }

}
