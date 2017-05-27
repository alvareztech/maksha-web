import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  users: FirebaseListObservable<any>;
  usersObjects: any[];

  constructor(private titleService: Title,
              private db: AngularFireDatabase) {
    this.titleService.setTitle('Stats');
    this.users = db.list('/users');
    this.users.subscribe(result => {
      console.log('users %j', result);
      this.usersObjects = result;
    });
  }

  ngOnInit() {
  }

}
