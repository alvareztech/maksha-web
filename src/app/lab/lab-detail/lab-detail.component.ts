import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {TechnologyService} from '../../services/technology.service';

import {Title} from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {MdDialog, MdSnackBar} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {InvitationEnterComponent} from '../../invitation-enter/invitation-enter.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {

  labId: string;
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

  user: Observable<firebase.User>;
  userObject: any;

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
              public technologyService: TechnologyService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private router: Router,
              public snackBar: MdSnackBar,
              public afAuth: AngularFireAuth,
              public dialog: MdDialog) {
    this.user = afAuth.authState;
    this.user.subscribe(x => {
      this.userObject = x;
    });
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.labId = params['id'];
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
    if (this.userObject) {
      this.currentStepNumber = i;
      this.currentStep = this.labObject.steps[this.currentStepNumber];
    } else {
      this.showInvitationEnter();
    }
    window.scrollTo(0, 0);
  }

  goNextStep() {
    if (this.userObject) {
      if (this.currentStepNumber === 0) {
        this.saveInitLab();
      }
      this.currentStepNumber++;
      this.currentStep = this.labObject.steps[this.currentStepNumber];
    } else {
      this.showInvitationEnter();
    }
    window.scrollTo(0, 0);
  }

  goBackStep() {
    this.currentStepNumber--;
    this.currentStep = this.labObject.steps[this.currentStepNumber];
    window.scrollTo(0, 0);
  }

  getSecureUrl(videoId: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0');
  }

  showInvitationEnter() {
    const dialogRef = this.dialog.open(InvitationEnterComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (this.userObject) {
        this.snackBar.open('¡Hola ' + this.userObject.displayName + '! 👋', null, {duration: 3000});
      }
    });
  }

  saveInitLab() {
    if (this.userObject) {
      const itemObservable = this.db.object('/users/' + this.userObject.uid + '/labs/' + this.labId);
      itemObservable.set({
        started: true,
        lastStep: 0,
        lastEntry: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }

}
