import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FIREBASE_CONFIG} from './keys';
import {AppRoutingModule} from './app-routing.module';
import {LabListComponent} from './lab/lab-list/lab-list.component';
import {LabDetailComponent} from './lab/lab-detail/lab-detail.component';
import {HomeComponent} from './home/home.component';
import {TechnologyService} from './services/technology.service';
import {AdminComponent} from './admin/admin.component';
import {MarkdownPipe} from './pipes/markdown.pipe';
import {SanitizeHtmlPipe} from './pipes/sanitize-html.pipe';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdMenuModule,
  MdCardModule,
  MdToolbarModule,
  MdIconModule,
  MdListModule,
  MdInputModule,
  MdButtonToggleModule,
  MdSelectModule,
  MdCheckboxModule,
  MdSnackBarModule,
  MdChipsModule, MdProgressSpinnerModule
} from '@angular/material';
import {ArticleListComponent} from './article/article-list/article-list.component';
import {ArticleDetailComponent} from './article/article-detail/article-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LabListComponent,
    LabDetailComponent,
    HomeComponent,
    AdminComponent,
    MarkdownPipe,
    SanitizeHtmlPipe,
    ArticleListComponent,
    ArticleDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdInputModule,
    MdSelectModule,
    MdCheckboxModule,
    MdButtonToggleModule,
    MdSnackBarModule,
    MdChipsModule,
    MdProgressSpinnerModule
  ],
  providers: [TechnologyService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
