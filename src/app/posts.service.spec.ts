import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';

describe('PostsService', () => {
  let postService: PostsService;
  let posts: Post[];
  let expectedPosts: Post[];
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    //Configures testing app module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsService
      ]
    });  
    
    //Instantiates HttpClient, HttpTestingController and PostService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    postService = TestBed.inject(PostsService);

    expectedPosts = [
      { id: 101, title: 'Test title 1' },
      { id: 102, title: 'Test title 2' },
    ] as Post[];
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('postService should be created', () => {
    expect(postService).toBeDefined();
  });

     
    //Test case 1
    it('should return expected posts by calling once', () => {
      postService.getPosts().subscribe(
        emps => expect(emps).toEqual(expectedPosts, 'should return expected posts'),
        fail
      );

      const req = httpTestingController.expectOne(postService.ROOT_URL);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPosts); //Return expectedPosts
    });
    
    //Test case 2
    it('should be OK returning no posts', () => {
      postService.getPosts().subscribe(
        res => expect(JSON.parse(JSON.stringify(res)).length).toEqual(0, 'should have empty posts array'),
        fail
      );

      const req = httpTestingController.expectOne(postService.ROOT_URL);
      req.flush([]); //Return empty data
    });
    
    //Test case 3
    it('should turn 404 error into an empty posts result', () => {
      postService.getPosts().subscribe(
        res => expect(JSON.parse(JSON.stringify(res)).length).toEqual(0, 'should return empty posts array'),
        fail
      );

      const req = httpTestingController.expectOne(postService.ROOT_URL);

      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

    //Test case 4
    it('should return expected posts when called multiple times', () => {
      postService.getPosts().subscribe();
      postService.getPosts().subscribe(
        emps => expect(emps).toEqual(expectedPosts, 'should return expected posts'),
        fail
      );

      const requests = httpTestingController.match(postService.ROOT_URL);
      expect(requests.length).toEqual(2, 'calls to getPosts()');

      requests[0].flush([]); //Return Empty body for first call
      requests[1].flush(expectedPosts); //Return expectedPosts in second call
    });
  });


