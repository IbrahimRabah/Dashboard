import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQURNSU4iLCJ1c2VySWQiOiI0YjQ5Y2RjZi04NTg0LTQ1YTYtYmU1Yy1hOWI1YjA0NjVkMDkiLCJ0ZW5hbnRJZCI6ImUwMTc4YTY5LWE1MjItNGNhYS1iMzBmLTE1MjU5MDNlNmNkMSIsInVzZXJSb2xlIjoiQWRtaW4iLCJuYmYiOjE3MDk4MjQxNjUsImV4cCI6MTcwOTkxMDU2NSwiaWF0IjoxNzA5ODI0MTY1LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUyOTQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.6qjcbIhTSMuZBxu5WL4MYehRyBbHG6lNyzdkkO3fD2c';
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', token) });
    return next.handle(modifiedReq);
  }
}
