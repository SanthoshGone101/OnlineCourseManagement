import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getEnrollmentUsers().subscribe({
      next: (res) => {
        console.log('Users response:', res);
        this.users = res.data;   // ✅ assign the array
      },
      error: (err) => console.error('Users fetch error:', err)
    });
  }

  changeRole(userId: number, role: string) {
    this.adminService.updateUserRole(userId, role).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Role update error:', err)
    });
  }
  
  
  
  

  deleteUser(userId: number) {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),   // refresh list after deletion
        error: (err) => console.error('Delete user error:', err)
      });
    }
  }
  
  
}

