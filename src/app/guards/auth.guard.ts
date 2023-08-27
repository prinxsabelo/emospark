import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const em_user_name = localStorage.getItem('em_user_name');

    if (em_user_name) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
