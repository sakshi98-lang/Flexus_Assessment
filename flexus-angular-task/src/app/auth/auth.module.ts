import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/authguard.guard';
import { RouterModule, Routes } from '@angular/router';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { ToastrModule } from 'ngx-toastr';



export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'staff-details', component: StaffDetailsComponent, canActivate: [AuthGuard]
  }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot({
      timeOut: 3000, // Toast duration in milliseconds
      positionClass: 'toast-top-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
    }),
  ],

})
export class AuthModule { }
