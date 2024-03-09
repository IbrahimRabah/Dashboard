import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  apiError!: string;
  constructor(private auth: AuthenticationService,private router:Router) { }
  ngOnInit(): void {
    this.initialization();
  }
  initialization() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
  }
  onSubmit() {
    {

      if (!this.loginForm.invalid) {
        this.auth.login(this.loginForm.value).subscribe({
          next: (response) => {
            console.log("res");
            if (response.statusCode == 200) {
              console.log(response.message);
                let role = response.data.roleName;
                let tenantId = response.data.tenantId;
                let token = response.data.token;
                localStorage.setItem('userData', JSON.stringify({ role, tenantId, token }));
                switch(role)
                {
                  case 'Admin':
                    this.router.navigate(['/admin/dashboard'])
                    break;
                  case 'Sales':
                    this.router.navigate(['/sales/salesHome'])
                }
            }
            else{
                console.log(response.message);
                this.apiError = response.message;
              }
          },
          error: (err) => {
            this.apiError = err.message
          }
        })
      } else {
        this.apiError = "Not Valid";
      }
    }
  }
}
