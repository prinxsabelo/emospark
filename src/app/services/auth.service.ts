import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public http: HttpClient, private router: Router) {}

  isLoggendIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

 
}
