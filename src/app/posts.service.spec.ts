import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';

describe('PostsService', () => {
  let service: PostsService;
  let posts: Post[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('receive 100 objects from PostService', waitForAsync(() => {
    service.getPosts().subscribe((res) => {      
    posts = JSON.parse(JSON.stringify(res));
    expect(posts.length).toBe(100);
  }, (error) => {
    console.log(error)
  });  
}));
});
