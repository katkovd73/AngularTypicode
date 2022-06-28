import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Post } from '../models/post.model';
import { PostsService } from '../posts.service';
import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let service: PostsService;
  let posts: Post[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [PostsService, HttpClient, HttpHandler]
    })
    .compileComponents();

    service = TestBed.inject(PostsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create component PostsComponent', () => {
    expect(component).toBeTruthy();
  });

  
  it('receive response from PostService', async() => {
      service.getPosts().subscribe(res => {
      expect(res).toBeDefined;      
    }, (error) => {
      console.log(error)
    });   
  });

  it('receive 100 objects from PostService', () => {
      service.getPosts().subscribe((res) => {      
      posts = JSON.parse(JSON.stringify(res));
      expect(posts.length).toBe(100);
    }, (error) => {
      console.log(error)
    });  
  });

  it('receive 2nd object title = qui est esse', async() => {
      service.getPosts().subscribe(res => {      
      posts = JSON.parse(JSON.stringify(res));
      expect(posts[1].title).toBe('qui est esse');
    }, (error) => {
      console.log(error)
    });  
  });

});
