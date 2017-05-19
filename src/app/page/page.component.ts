import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: FirebaseObjectObservable<any>;
  pageObject = {
    content: ''
  };
  isFinishLoad = false;

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
              private router: Router,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.page = this.db.object('/pages/' + params['id']);
      this.page.subscribe(value => {
        if (value.hasOwnProperty('$value') && !value['$value']) {
          this.snackBar.open('No encontramos lo que buscas, perdón. 😢', null, {duration: 3000});
          this.router.navigate(['/']);
        } else {
          this.isFinishLoad = true;
          this.downloadJS('https://apis.google.com/js/platform.js');
          this.downloadJS('https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.9&appId=269827340075535');
          this.pageObject = value;
        }
      });
    });
  }

  downloadJS(fileURL) {
    const script = document.createElement('script');
    script.src = (fileURL);
    document.head.appendChild(script);
  }

}
