
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeedComponent } from './feed/feed.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './settings/account/account.component';
import { EmailComponent } from './settings/email/email.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { SecurityComponent } from './settings/security/security.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipComponent } from './material-components/chipComponent/chip/chip.component';

import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({ 
  declarations: [
    AppComponent,
    HomepageComponent,
    FeedComponent,
    SettingsComponent,
    AccountComponent,
    EmailComponent,
    ConnectionsComponent,
    SecurityComponent,
    AddBlogComponent,
    ChipComponent,
    BlogDetailComponent,
    SanitizeHtmlPipe,
    LoginComponent,
    UserProfileComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RichTextEditorAllModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return localStorage.getItem('auth_token');},
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['http://localhost:5000/login']
      }
    })  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
