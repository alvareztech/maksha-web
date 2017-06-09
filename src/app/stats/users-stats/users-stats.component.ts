import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-users-stats',
  templateUrl: './users-stats.component.html',
  styleUrls: ['./users-stats.component.css']
})
export class UsersStatsComponent implements OnInit {

  users: FirebaseListObservable<any>;
  usersObjects: any[];

  user: Observable<firebase.User>;
  userObject: any;

  constructor(private titleService: Title,
              public afAuth: AngularFireAuth,
              private router: Router,
              private db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.user.subscribe(result => {
      this.userObject = result;
      if (this.userObject && this.userObject.uid === 'VPzZ9izNNravYPUNfiBimpr7put2') {
        this.load();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  load() {
    this.titleService.setTitle('Stats');
    this.users = this.db.list('/users');
    this.users.subscribe(result => {
      this.usersObjects = result;
    });
  }

  ngOnInit() {
  }

}
