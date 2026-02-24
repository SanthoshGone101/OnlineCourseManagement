import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service'; // adjust path if needed
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ add this

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  courses: any[] = [];

  // ✅ Inject StudentService here
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.studentService.getMyCourses().subscribe({
      next: (res) => {
        console.log('API response:', res); // debug
        this.courses = res.data;           // ✅ use the data array
      },
      error: (err) => console.error('My courses fetch error:', err)
    });
  }
  
  unenroll(courseId: number) {
    if (confirm("Are you sure you want to unenroll from this course?")) {
      this.studentService.unenrollCourse(courseId).subscribe({
        next: (res) => {
          alert(res.message); // "Unenrolled successfully"
          this.loadCourses(); // refresh list after unenroll
        },
        error: (err) => console.error('Unenroll error:', err)
      });
    }
  }
  
  
}
