import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {MdSnackBar} from '@angular/material';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: FirebaseListObservable<any>;

  user: Observable<firebase.User>;
  userObject: any;

  content = '';

  @Input('type') type: string;
  @Input('identifier') identifier: string;
  @Input('step') step = 0;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public snackBar: MdSnackBar) {
    this.user = afAuth.authState;
    this.user.subscribe(result => {
      this.userObject = result;
    });
  }

  ngOnInit() {
    this.comments = this.db.list('comments/' + this.type + '/' + this.identifier + '/', {
      query: {
        orderByChild: 'publishDate'
      }
    });
  }

  publish(form: NgForm) {
    this.comments.push({
      content: this.content,
      publishDate: firebase.database.ServerValue.TIMESTAMP,
      userPhotoURL: this.userObject.photoURL,
      userName: this.userObject.displayName,
      userId: this.userObject.uid,
      step: this.step
    }).then(a => {
      form.resetForm();
      this.content = '';
    }).catch(err => {
      this.snackBar.open('Ocurrió un problema, no se puede publicar 😢', null, {duration: 2000});
    });
  }

  eliminar(key: any) {
    this.comments.remove(key).then(a => {
      this.snackBar.open('Se eliminó correctamente 😮', null, {duration: 2000});
    }).catch(err => {
      this.snackBar.open('Ocurrió un problema, no se pudo eliminar 😢', null, {duration: 2000});
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
