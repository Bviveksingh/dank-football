
import { BlogService } from './../api-calls/blog.service';
import { FeatureImageService } from './../api-calls/feature-image.service';
import { ChipComponent } from './../material-components/chipComponent/chip/chip.component';

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements AfterViewInit {
  
  private blog_content: string = ``;
  selectedFile: File;
  private tags: [];
  private title: string;
  private authorname:string;
  private previewImage:any;
  private userEmail:string;
  showPreview:boolean = false;
  private createdBlogId:string;  
  @ViewChild(ChipComponent, {static:false}) childReference:any;
  
  
  constructor(private http:HttpClient, 
              private featureImageService:FeatureImageService, 
              private blogService:BlogService,
              private router:Router,
              private snackBar: MatSnackBar,
              private jwtHelper:JwtHelperService
              ) {}

  ngOnInit() {
    let auth_token =  localStorage.getItem("auth_token");
    let decoded_token = this.jwtHelper.decodeToken(auth_token);
    this.userEmail = decoded_token.identity;
    
    
  }

  ngAfterViewInit(){
    if(!this.showPreview){
      this.tags = this.childReference.tags;
    }
    
  }

  processFile(imageInput:any){
    this.selectedFile = imageInput.files[0];
    this.previewImageLoad();
  }

  previewImageLoad(){
    let reader = new FileReader();
    reader.onloadend = e =>{
      this.previewImage = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }



  async submitBlog(){

    if(this.tags.length > 5){
      this.snackBar.open("Maximum of 5 tags are allowed!", "close");
      return;
    }
    
    const imageData = await this.featureImageService.uploadImage(this.selectedFile).toPromise();
    
    


    let blogProps = {
      authorname: this.authorname,
      title:this.title,
      content:this.blog_content,
      user_email:this.userEmail,  
      featured_image:imageData['data'].link,
      tags: []
    }
    this.tags.map((x)=>{
      blogProps.tags.push(x["name"])
    });
    

    
    this.blogService.addBlog(blogProps).subscribe(response=>{
      this.createdBlogId = response["id"];
      this.router.navigateByUrl('blog/'+this.createdBlogId);
    });
    

  }




}
