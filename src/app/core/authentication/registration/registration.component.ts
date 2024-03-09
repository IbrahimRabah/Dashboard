import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/Role';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  registerationForm!:FormGroup;
  selectedRole!:number;
  isTeamLead!:number;
  roleOptions!:Role[];
  userRole!:string;
  adminRoleOptions:Role[] = [{id:1,value:"Manager"},{id:2,value:"TeamLeader"},{id:3,value:"Sales"},{id:4,value:"Hr"},{id:5,value:"Retention"} ]
  managerRoleOptions:Role[] = [{id:2,value:"TeamLeader"},{id:3,value:"Sales"},{id:4,value:"Hr"},{id:5,value:"Retention"} ]
  teamLeaderRoleOptions:Role[] = [{id:3,value:"Sales"}]
  teamLeads:Role[]=[{id:1,value:"Ibrahim"},{id:2,value:"Abdallah"},{id:3,value:"Moeen"},{id:4,value:"Nour"}]
  constructor(private auth:AuthenticationService){}
  ngOnInit(): void {
    this.initialization();
    let userData = JSON.parse(localStorage.getItem('userData')!!);
    this.userRole = userData.role;
    switch(this.userRole)
    {
      case 'Admin':
        this.roleOptions = this.adminRoleOptions;
        break;
      case 'Manager':
        this.roleOptions = this.managerRoleOptions;
        break;
      case 'TeamLeader':
        this.roleOptions = this.teamLeaderRoleOptions;
        break;
      default:
        this.roleOptions = this.roleOptions;
    }
  }

  initialization()
  {
    this.registerationForm = new FormGroup(  {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$')]),
      rePassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$')]),
      phoneNumber: new FormControl('', [Validators.required]),
      companyPhoneNumber: new FormControl('', [Validators.required]),
      nationalId : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      role: new FormControl(0, [Validators.required]),
      superiorRole: new FormControl(0),
      teamLeaderId: new FormControl('0')


    });
  }
  onSubmit() {
    console.log(this.registerationForm.value)
    if (this.registerationForm.valid) {
      this.auth.register(this.registerationForm.value).subscribe(
        {
          next: (response) => {
           console.log(response);
          },
          error: (err) => {
            console.log(err.message);
          }
        }
      )
    }
    else {
      alert("notvalid")
      console.log("formsValue", this.registerationForm)

    }

  }
}
