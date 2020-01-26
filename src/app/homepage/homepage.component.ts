import { BlogService } from './../api-calls/blog.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  private userLoggedIn: boolean = false;
  private blogs: Array<{id:string, authorname:string, title:string,content:string,user_id:string, featured_image:string, updated_at:Date}> = [];
  

  constructor(private auth:AuthService,private router:Router,private blogService:BlogService) {}

  
  ngOnInit() {
    this.checkUserLoggedIn();
    this.getBlogs();
    
  }


  checkUserLoggedIn(){
    if(this.auth.userLoggedIn()){
      this.userLoggedIn = true;
      this.router.navigateByUrl('/feed');
    }
  }

  getBlogs(){
    this.blogService.getAllBlogs().subscribe(response =>{
      response["blogs"].forEach((element) => {
        this.blogs.push(element);
      });
    })
  }

}
