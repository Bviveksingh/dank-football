import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeedComponent } from './feed/feed.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './settings/account/account.component';
import { EmailComponent } from './settings/email/email.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { SecurityComponent } from './settings/security/security.component';

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
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
