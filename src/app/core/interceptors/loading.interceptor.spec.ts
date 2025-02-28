import { TestBed } from '@angular/core/testing';
import { LoadingInterceptor } from './loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoadingService } from '../services/loading.service';

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoadingService, useValue: loadingServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        }
      ]
    });

    interceptor = TestBed.inject(LoadingInterceptor);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should toggle loading before/after request', () => {
    http.get('/api/test').subscribe();
    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('GET');

    // setLoading(true) al iniciar
    expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(true);

    req.flush({}); // respondemos la petición

    // setLoading(false) al finalizar
    expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(false);
  });
});
