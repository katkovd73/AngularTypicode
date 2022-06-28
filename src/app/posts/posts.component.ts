import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private service:PostsService) { }

  ngOnInit(): void {
    this.service.getPosts().subscribe(res => {         
      this.posts = JSON.parse(JSON.stringify(res));      
    }, err => console.log('Error retrieving data: ' + err),
    );    
  }
}
