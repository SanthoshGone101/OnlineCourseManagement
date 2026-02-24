import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports:[CommonModule],
})
export class AdminDashboardComponent implements OnInit {
  stats: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getEnrollmentDashboard().subscribe({
      next: (res) => {
        console.log('Dashboard response:', res);
        this.stats = res.data;   // ✅ assign the "data" object
      },
      error: (err) => console.error('Dashboard fetch error:', err)
    });
  }
}



