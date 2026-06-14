import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Student';

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.apiService.register(payload).subscribe(res => {
      if (res.success) {
        alert('Registration successful!');
        this.router.navigate(['/']);  // Redirect to login page
      } else {
        alert(res.message);
      }
    });
  }
}
