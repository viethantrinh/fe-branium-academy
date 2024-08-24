import {inject, Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';

/**
 * this will send request to backend without go through interceptors chain
 */
@Injectable({
  providedIn: 'root'
})
export class HttpBackendClientService extends HttpClient {
  constructor(private readonly httpBackend: HttpBackend) {
    super(httpBackend);
  }
}
