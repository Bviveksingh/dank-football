import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UsersService } from './api-calls/users.service';
import { CustomValidatorsService } from './custom-validators.service';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import {faFacebookF,faTwitter,faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faSearch,faBars,faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  title = 'dankFrontend';
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faSearch = faSearch;
  faBars = faBars;
  faTimes = faTimes;
  registerForm :FormGroup;
  isRegisterFormSubmitted: boolean = false;
  showFullpageNav: boolean = false;
  loadSignInModal:boolean;
  loadSignInForm:boolean;
  userLoggedIn:boolean = false;



  constructor(private formBuilder: FormBuilder,
              private customValidator: CustomValidatorsService,
              private userService:UsersService,
              private auth: AuthService,
              private router:Router
              ){}

  ngOnInit(){
    this.loadSignInModal = false;
    this.loadSignInForm = true;
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
    },  
      {
        validator: this.customValidator.MustMatch('password', 'confirmpassword')
      }
    );

  }
  
  ngDoCheck(){
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn(){
    if(this.auth.userLoggedIn()){
      this.userLoggedIn = true;
    }
  }

  signOut(){
    this.auth.signedOut();    
    this.userLoggedIn = false;
    this.router.navigateByUrl("/");
  }

  register(form:FormGroup){
    this.isRegisterFormSubmitted = true;
    // if(this.registerForm.valid){
    //   console.log(`Form values are ${this.registerForm.value}`);

    // }
   if(form.valid){
    let formValue = form.value;
    delete formValue.confirmPassword;
    // let validForm = {
    //   "firstname": jsonForm.firstname,
    //   "lastname": jsonForm.lastname,
    //   "email":jsonForm.
    // }
    // let jsonForm = JSON.stringify(formValue);
    // console.log(jsonForm);
    
    this.userService.registerUser(formValue);
   }

   if(form.invalid){
     console.log('Form is invalid');
   }
    

    
  }


  get f(){return this.registerForm.controls}




  signinForm = new FormGroup({
    signInEmail :new FormControl('',[
      Validators.required
    ]),
    signInPassword: new FormControl('',[
      Validators.required 
    ])
  })


  toggleSigninRegister(){
    this.loadSignInForm? this.loadSignInForm = false : this.loadSignInForm = true;
  }


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
