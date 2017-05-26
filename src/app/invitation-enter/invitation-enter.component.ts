import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-invitation-enter',
  templateUrl: './invitation-enter.component.html',
  styleUrls: ['./invitation-enter.component.css']
})
export class InvitationEnterComponent implements OnInit {

  user: Observable<firebase.User>;
  userObject: any;
  isLoadFinish = true;

  constructor(public dialogRef: MdDialogRef<InvitationEnterComponent>,
              public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe(x => {
      this.isLoadFinish = true;
      this.userObject = x;
      if (this.userObject) {
        this.dialogRef.close();
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.isLoadFinish = false;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  cancel() {
    this.dialogRef.close();
  }

}
