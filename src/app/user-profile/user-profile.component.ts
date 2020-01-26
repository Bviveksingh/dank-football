import { UsersService } from './../api-calls/users.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private user_id:string;
  constructor(private userService:UsersService, private activeRoute:ActivatedRoute) { }
  private blogs= [];


  ngOnInit() {
    this.activeRoute.params.subscribe((response)=>{
      this.user_id = response.id;
      this.getUserInfo();
    }); 
  }

  getUserInfo(){
    this.userService.getUserProfile(this.user_id).subscribe((response)=>{
      response["user"].blogs.forEach((element:any) => {
        this.blogs.push(element);
      });
    })
  }
  

}
