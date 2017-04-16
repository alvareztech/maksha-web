import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import {FIREBASE_CONFIG} from './keys';
import {AppRoutingModule} from './app-routing.module';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabDetailComponent } from './lab-detail/lab-detail.component';
import { HomeComponent } from './home/home.component';
import {TechnologyService} from './services/technology.service';
import { AdminComponent } from './admin/admin.component';

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    LabListComponent,
    LabDetailComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG, firebaseAuthConfig)
  ],
  providers: [TechnologyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
