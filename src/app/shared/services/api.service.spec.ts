import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('postService (HttpClientTestingModule)', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;
  let POSTS = {
    "results":[
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      }
    ]
  };
  let url = 'https://randomuser.me/api/?results=20&page=1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getPosts()', () => {
    it('should return reources when getResource() is called', (done: DoneFn) => {
      apiService.getResource(url).subscribe((data: any) => {
        expect(data).toEqual(POSTS.results);
        done();
      });

      const request = httpTestingController.expectOne(url);

      request.flush(POSTS);

      expect(request.request.method).toBe('GET');
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
