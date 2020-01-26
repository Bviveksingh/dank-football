import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../auth.service';
import { BlogService } from './../api-calls/blog.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  private blog_id: string;
  private blog_title:string;
  private blog_content:string;
  private blog_authorname:string;
  private blog_tags:[];
  private blog_featuredImage: string;
  private upvotes: number; 
  private user_id: string;
  private blog_created_date: string;
  private already_upvoted:boolean;
  constructor(private activeRoute:ActivatedRoute,private blogService:BlogService,private auth:AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((response)=>{
      this.blog_id = response.id;
      this.getBlogInfo();
      this.get_upvotes();
    });
    if(this.auth.userLoggedIn()){
      console.log("user logged in!")
      console.log(this.checkUpvoted());
      if(this.checkUpvoted()){
        this.already_upvoted = true;
      }
      else{
        this.already_upvoted = false;
      } 
    }else{
      console.log("User not logged in")
      this.already_upvoted = false;
    }
    
        
  }

  

  getBlogInfo(){
    this.blogService.getBlogById(this.blog_id).subscribe(response =>{
      this.blog_title = response["blog"].title;
      this.blog_content = response["blog"].content;
      this.blog_authorname = response["blog"].authorname;
      this.blog_featuredImage = response["blog"].featured_image;
      this.blog_tags = response["blog"].tags;
      this.user_id = response["blog"].user_id;
      let createdDate = new Date(response["blog"].updated_at);
      this.blog_created_date = createdDate.toDateString();
    });
  }

  checkUpvoted(){
    const user_id = this.auth.getUser();
    const response = this.blogService.checkIfUserAlreadyUpvoted(user_id, this.blog_id);
    if(response["count"] == 1){
      return true;
    }
    if(response["count"] == 0 ){
      return false;
    }
  }

  async downVote(){
    
    const user_id = this.auth.getUser();
    const response = await this.blogService.downvote(user_id, this.blog_id).toPromise();
    this.get_upvotes();
    this.already_upvoted = false;
    // this.blogService.downvote(user_id, this.blog_id).subscribe((response)=>{
    //   this.get_upvotes();
    // });
    
  }

  async add_upvote(){
    if(this.auth.userLoggedIn()){
      const user_id = this.auth.getUser();
      
      // this.blogService.addUpvoteByUser(user_id, this.blog_id).subscribe((response)=>{
      //   this.get_upvotes();
        
      // });
      
      const response = await this.blogService.addUpvoteByUser(user_id, this.blog_id).toPromise();
      this.get_upvotes();
      this.already_upvoted = true;
    }
    else{
      this.snackBar.open("You need to login to upvote", "Close")
      return;
    }
  }

  get_upvotes(){
    this.blogService.getAllUpvotes(this.blog_id).subscribe((response:any)=>{
      this.upvotes = response.count;
    })
  }

}
