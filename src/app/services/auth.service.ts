import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    console.log('Decoded token:', decoded);

    return {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token.trim() !== '';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);  // ✅ redirect to root welcome/login page
  }
}
