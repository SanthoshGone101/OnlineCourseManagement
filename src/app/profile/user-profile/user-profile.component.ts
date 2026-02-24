import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgIf, NgFor,RouterModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  user: any;
  courses: any[] = [];
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 10;
  isAdmin = false;
  isStudent = false;

  constructor(public apiService: ApiService,private authService: AuthService) {{
    this.user = this.authService.getCurrentUser();
    const roleValue = (this.user?.role || '').trim().toLowerCase();

    this.isAdmin = roleValue === 'admin';
    this.isStudent = roleValue === 'student';
    
    
    
  }
}


ngOnInit() {
  
  this.apiService.getProfile().subscribe({
    next: (res) => {
      this.user = res.data;
      console.log('Profile response:', res.data);


      const roleValue = (this.user?.role || '').trim().toLowerCase();
      this.isAdmin = roleValue === 'admin';
      this.isStudent = roleValue === 'student';

      if (this.isStudent) {
        this.loadCourses();
      }

      console.log('Role value:', roleValue, 'isAdmin:', this.isAdmin, 'isStudent:', this.isStudent);
    },
    
    error: (err) => console.error('Profile fetch error:', err)
    
  },
);
}


  loadCourses(page: number = 1) {
    this.apiService.getCourses(page, this.pageSize).subscribe({
      next: (res) => {
        console.log('Courses response:', res);   // ✅ check shape in console
        this.courses = res.data;                 // ✅ assign the "data" array
        this.totalCount = res.totalCount;
        this.page = res.page;
      },
      error: (err) => console.error('Courses fetch error:', err)
    });
  }
  
  

  nextPage() {
    if ((this.page * this.pageSize) < this.totalCount) {
      this.loadCourses(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.loadCourses(this.page - 1);
    }
  }

 
  logout() {
    this.apiService.logout();   // clears token + redirects
  }

  enroll(course: any) {
    this.apiService.enrollCourse(
      this.user.userId,      // ✅ correct field
      course.courseId,
      this.user.name,        // ✅ correct field
      course.title
    ).subscribe({
      next: (res) => {
        alert(`Enrolled in ${res.courseTitle} successfully`);
        this.loadCourses(); // refresh list
      },
      error: (err) => console.error('Enroll error:', err)
    });
  }
  
  
  
  
  
}

