import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const apiService = inject(ApiService);  // Inject the ApiService
  const router = inject(Router);  // Inject the Router

  // Check if the user is logged in
  if (apiService.isLoggedIn()) {
    return true; // User is authenticated
  } else {
    router.navigate(['auth/login']); // Redirect to login if not authenticated
    return false;
  }
};