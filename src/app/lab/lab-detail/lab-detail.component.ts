import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {TechnologyService} from '../../services/technology.service';

import {Title} from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {MdSnackBar} from '@angular/material';

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
    steps: [],
    videoId: null,
    trustVideoUrl: null
  };
  loadFinish = false;

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
              public technologyService: TechnologyService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private router: Router,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.lab = this.db.object('/labs/' + params['id']);
      this.lab.subscribe(value => {
        if (value.hasOwnProperty('$value') && !value['$value']) {
          this.snackBar.open('No encontramos lo que buscas, perdón. 😢', null, {duration: 3000});
          this.router.navigate(['labs']);
        } else {
          this.titleService.setTitle(value.title);
          this.labObject = value;
          this.labObject.trustVideoUrl = this.getSecureUrl(this.labObject.videoId);
          this.loadFinish = true;
          this.currentStep = this.labObject.steps[0];
          this.currentStepNumber = 0;
          this.totalStepsNumber = this.labObject.steps.length;
        }
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

  getSecureUrl(videoId: string) {
    console.log('getSecureUrl called: ' + videoId);
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0');
  }

}
