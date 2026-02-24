import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { RouterModule } from '@angular/router'; // ✅ add this

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgFor, NgIf,RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courses: any[] = [];
  user: any;   // ✅ declare user property

  constructor(private studentService: StudentService) {}
  

  ngOnInit() {
    this.studentService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile.data;   // ✅ assign the actual user object
        this.loadCourses();
      },
      error: (err) => console.error('Profile fetch error:', err)
    });
  }
  
  
  loadCourses() {
    this.studentService.getAllCourses().subscribe({
      next: (res) => this.courses = res,
      error: (err) => console.error('Available courses fetch error:', err)
    });
  }
  
  
  
  enroll(course: any) {
    this.studentService.enrollCourse(
      this.user.userId,
      course.courseId,
      this.user.name,
      course.title
    ).subscribe({
      next: (res) => {
        alert(`Enrolled in ${res.courseTitle} successfully`);
        this.ngOnInit(); // refresh list
      },
      error: (err) => {
        if (err.error && err.error.message === 'Already enrolled in this course') {
          alert('You are already enrolled in this course.');
        } else {
          console.error('Enroll error:', err);
          alert('Something went wrong while enrolling.');
        }
      }
    });
  }
  
  
  
  
  
}
