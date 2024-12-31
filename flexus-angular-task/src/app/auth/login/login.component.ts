import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userObj: any = {
    username: '',
    password: ''
  };
  submitted: boolean = false;
  showPassword = false;

  constructor(private apiService: ApiService,private toastr: ToastrService,private router : Router) { }

  ngOnInit(){
    console.log(this.toastr)
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  
  }

  submitForm(loginform: any) {
    if (loginform.valid) {
      this.apiService.postRequest('api/auth/login', this.userObj).subscribe((resp: any) => {
        if (resp) {
          localStorage.setItem('authToken', JSON.stringify(resp.token));
          this.toastr.success(resp.message)
          this.router.navigate(['auth/staff-details'])
        }
      })
    }
    else {
      this.toastr.error('fill all the required fields')
    }
  }
}
