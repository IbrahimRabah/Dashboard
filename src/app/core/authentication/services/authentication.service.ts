import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl;
  currentUrl = "Account/";
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
  register(registerObj: any): Observable<any> {
    const url = `${this.baseUrl+this.currentUrl}Register`
    return this.http.post<any>(url, registerObj);
  }

  login(loginObj: any): Observable<any> {
    const url = `${this.baseUrl+this.currentUrl}Login`;
    return this.http.post(url, loginObj).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
  logout()
  {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('userData');
  }
  isAuthenticatedUser()
  {
    const token = localStorage.getItem('userData');
    this.isAuthenticatedSubject.next(!!token);
  }
  // getUserRole() {
  //   const role = localStorage.getItem('role');
  //   console.log("role", role)
  //   if (role === 'admin') {
  //     this.isAdminSubject.next(true);
  //   } else {
  //     this.isAdminSubject.next(false);
  //   }
  // }

}
