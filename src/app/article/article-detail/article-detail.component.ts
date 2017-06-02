import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: FirebaseObjectObservable<any>;
  articleObject = {
    title: '',
    content: ''
  };
  isFinishLoad = false;
  articleId: string;

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
              private titleService: Title,
              private router: Router,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.articleId = params['id'];
      this.article = this.db.object('/articles/' + params['id']);
      this.article.subscribe(value => {
        if (value.hasOwnProperty('$value') && !value['$value']) {
          this.snackBar.open('No encontramos lo que buscas, perdón. 😢', null, {duration: 3000});
          this.router.navigate(['articles']);
        } else {
          this.isFinishLoad = true;
          this.titleService.setTitle(value.title);
          this.articleObject = value;
          this.downloadJS('https://platform.twitter.com/widgets.js');
          this.downloadJS('https://platform.instagram.com/en_US/embeds.js');
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
