import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    const payload = {
      email: this.email,
      password: this.password
    };
  
    this.apiService.login(payload).subscribe({
      next: (res: any) => {
        if (res && res.token) {
          localStorage.setItem('jwtToken', res.token);
          alert('Login successful!');
          this.router.navigate(['/user-profile']);   // ✅ redirect
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Invalid credentials');
      }
    });
    ;
  }
  
}
