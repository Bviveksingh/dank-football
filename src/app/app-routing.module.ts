import { SecurityComponent } from './settings/security/security.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { EmailComponent } from './settings/email/email.component';
import { AccountComponent } from './settings/account/account.component';
import { SettingsComponent } from './settings/settings.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeedComponent } from './feed/feed.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'feed',component:FeedComponent},
  
  {path: 'settings', component: SettingsComponent,
  children:[
    {path:'', component:AccountComponent},
    {path:'account', component: AccountComponent},
    {path:'email',component:EmailComponent},
    {path:'connections',component: ConnectionsComponent},
    {path:'security',component:SecurityComponent}
  ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
