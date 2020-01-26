import { Router } from '@angular/router';
import { LoginRegisterService } from './../api-calls/login-register.service';
import { UsersService } from './../api-calls/users.service';
import { CustomValidatorsService } from './../custom-validators.service';
import { Component, OnInit } from '@angular/core';
import {faFacebookF,faTwitter,faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faSearch,faBars,faTimes} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faSearch = faSearch;
  faBars = faBars;
  faTimes = faTimes;
  registerForm :FormGroup;
  signInForm: FormGroup;
  isRegisterFormSubmitted: boolean = false;
  isSignInFormSubmitted:boolean = false;
  loadSignInModal:boolean;
  loadSignInForm:boolean;

  constructor(private formBuilder: FormBuilder,
    private customValidator: CustomValidatorsService,
    private loginRegister: LoginRegisterService,
    private snackBar:MatSnackBar,
    private router:Router
    ) { }

  ngOnInit() {
    this.loadSignInModal = true;
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
  this.signInForm = this.formBuilder.group({
    email: ['', Validators.required],
    password:['',Validators.required]
  });
}

 register(form:FormGroup){
    this.isRegisterFormSubmitted = true;
    // if(this.registerForm.valid){
    //   console.log(`Form values are ${this.registerForm.value}`);

    // }
    if(form.valid){
      let formValue = form.value;
      delete formValue.confirmPassword;

      this.loginRegister.register(formValue).subscribe((response:Response)=>{
        this.snackBar.open("You can now login to your account","Close");
      })
      
      
    }

    if(form.invalid){
      this.snackBar.open("Check the errors!");
    }
    

    
  }

  get f(){return this.registerForm.controls}

  get f2(){return this.signInForm.controls}


  signIn(form:FormGroup){
    this.isSignInFormSubmitted = true;
    if(form.valid){
      this.loginRegister.login(form.value).subscribe((response)=>{
        if(response){
          this.snackBar.open("You are now logged in", "Close");
        }
      })
        
    }
    if(form.invalid){
      this.snackBar.open("Form is invalid", "Close");
    }

  }


  toggleSigninRegister(){
    this.loadSignInForm? this.loadSignInForm = false : this.loadSignInForm = true;
  }




}
