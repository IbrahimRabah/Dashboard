import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  constructor(private router:Router, private auth:AuthenticationService){}

  logout(){
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
