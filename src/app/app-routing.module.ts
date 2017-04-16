import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LabDetailComponent} from './lab-detail/lab-detail.component';
import {LabListComponent} from './lab-list/lab-list.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';

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
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
