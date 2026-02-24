import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/login/login.component';
import { RouterLink } from '@angular/router'; // ✅ import RouterLink
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent,RouterLink,FormsModule],  // ✅ import child components
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}


