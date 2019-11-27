import { Component, OnInit } from '@angular/core';
import {faFacebookF,faTwitter,faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faSearch,faBars,faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'dankFrontend';
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faSearch = faSearch;
  faBars = faBars;
  faTimes = faTimes;
  showFullpageNav: boolean = false;
  loadSignIn:boolean = false;
  signInForm: boolean = true;
  

  toggleFullNavigation(){
    let fullpageNav = document.getElementById("fullpage-navigation");
    if(this.showFullpageNav){
      fullpageNav.style.width = "0";
      fullpageNav.style.opacity = "1";
      fullpageNav.style.overflowX = "hidden";
      this.showFullpageNav = false;
    }
    else{
      fullpageNav.style.width = "100%";
      fullpageNav.style.overflowX = "visible";
      fullpageNav.style.opacity = "100";
      this.showFullpageNav = true;
    }
    
  }


}
