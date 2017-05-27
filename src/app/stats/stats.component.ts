import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

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
