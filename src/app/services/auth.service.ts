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
    console.log('Decoded token:', decoded); // ✅ see exact keys
  
    return { 
      id: decoded.userId, 
      email: decoded.email, 
      role: decoded.role   // must match backend payload
    };
  }
  
  

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token.trim() !== '';  // ✅ only true if a real token exists
  }
  


  logout() {
    // ✅ clear stored session
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // ✅ redirect to login
    this.router.navigate(['/login']);
  }

}

