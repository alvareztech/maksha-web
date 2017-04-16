import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../services/technology.service';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  saveLab = true; // update otherwise

  labsPreview: FirebaseListObservable<any>;
  lab: FirebaseObjectObservable<any>;

  currentPage = 3;

  constructor(private technologyService: TechnologyService, private af: AngularFire) {
    this.labsPreview = af.database.list('/previews', {
      query: {
        orderByChild: 'category',
        equalTo: 'lab'
      }
    });
  }

  ngOnInit() {
  }

  goLab(id: string) {
    console.log('Id ' + id + ' pressed');

    this.saveLab = false;
    this.lab = this.af.database.object('/labs/' + id);
    this.lab.forEach(value => {
      console.log('Lab: %j', value);
    });
  }

  newStep() {
    console.log('New step pressed');
  }

}
