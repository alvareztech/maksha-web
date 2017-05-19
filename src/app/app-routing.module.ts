import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LabDetailComponent} from './lab/lab-detail/lab-detail.component';
import {LabListComponent} from './lab/lab-list/lab-list.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {ArticleListComponent} from './article/article-list/article-list.component';
import {ArticleDetailComponent} from './article/article-detail/article-detail.component';
import {PageComponent} from './page/page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'labs',
    component: LabListComponent
  },
  {
    path: 'labs/:id',
    component: LabDetailComponent
  },
  {
    path: 'articles',
    component: ArticleListComponent
  },
  {
    path: 'articles/:id',
    component: ArticleDetailComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: ':id',
    component: PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
