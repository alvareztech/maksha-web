import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Observable<any>;

  user: Observable<firebase.User>;
  userObject: any;

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.user.subscribe(result => {
      this.userObject = result;
    });
    this.comments = db.list('/comments/labs', {
      query: {
        orderByChild: 'updated'
      }
    });
  }

  ngOnInit() {
  }

}
