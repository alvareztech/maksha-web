import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ALVAREZ.tech';
  user: Observable<firebase.User>;
  isLoad = false;
  userObject: any;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe(x => {
      this.isLoad = true;
      this.userObject = x;
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(a => {
      console.log('signOut:', a);
    });
  }

  onDeactivate() {
    document.body.scrollTop = 0;
  }
}
