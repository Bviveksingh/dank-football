import { BlogService } from './../api-calls/blog.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UsersService } from './../api-calls/users.service';
import { Component, OnInit } from '@angular/core';
import {faBolt,faUserCircle,faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  faBolt = faBolt;
  faTimes = faTimes;
  faUserCircle = faUserCircle;
  private blogs = [];
  user = {
    firstname: "",
    lastname:"",
    followers:"",
    following:"",
    id:""
  }
  constructor(private userService:UsersService, private auth:AuthService,private blogService:BlogService, private router:Router) { }

  ngOnInit() {
    this.getUser();
    this.getAllBlogs();
  }

  getUser(){
    const user_email = this.auth.getUser();
    this.userService.getUserProfile(user_email).subscribe(response => {
      this.user.firstname = response["user"].firstname;
      this.user.lastname = response["user"].lastname;
      this.user.followers = response["user"].followers;
      this.user.following = response["user"].following;
      this.user.id = response["user"].id;
    });
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe((response)=>{
      response["blogs"].forEach(element =>{
        this.blogs.push(element);
      });
    })
  }

  openProfile(){
      this.router.navigateByUrl("/profile/"+ this.user.id);
  }
}
