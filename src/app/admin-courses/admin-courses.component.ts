import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms'; // ✅ import FormsModule 
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';


@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent {
  newCourse = { title: '', description: '' };

  constructor(private adminService: AdminService) {}
  ngOnInit() {
    console.log('AdminCoursesComponent initialized');
    this.loadCourses();
  }
  
  courses: any[] = [];
  courseTitle: string = '';
  courseDescription: string = '';
  courseMediaPath: string = '';
  
  editTitle: string = '';
  editDescription: string = '';
  editMediaPath: string = '';
  
  
  
  loadCourses() {
    this.adminService.getCourses().subscribe({
      next: (res) => this.courses = res,
      error: (err) => console.error('Courses fetch error:', err)
    });
  }
  
  addCourse() {
    const newCourse = {
      title: this.courseTitle,
      description: this.courseDescription,
      mediaPath: this.courseMediaPath
    };
    this.adminService.addCourse(newCourse).subscribe({
      next: () => {
        this.loadCourses();
        this.courseTitle = '';
        this.courseDescription = '';
        this.courseMediaPath = '';
      },
      error: (err) => console.error('Add course error:', err)
    });
  }
  
  updateCourse(courseId: number) {
    const updatedCourse = {
      courseId: courseId,                // ✅ include ID
      title: this.courseTitle,
      description: this.courseDescription,
      mediaPath: this.courseMediaPath
    };
    this.adminService.updateCourse(courseId, updatedCourse).subscribe({
      next: () => this.loadCourses(),
      error: (err) => console.error('Update course error:', err)
    });
  }
  
  deleteCourse(courseId: number) {
    if (confirm("Are you sure you want to delete this course?")) {
      this.adminService.deleteCourse(courseId).subscribe({
        next: () => this.loadCourses(),
        error: (err) => console.error('Delete course error:', err)
      });
    }
  }
  
  isEditMode: boolean = false;
editCourseId: number | null = null;

editCourse(course: any) {
  this.isEditMode = true;
  this.editCourseId = course.courseId;

  // Pre-fill form fields with selected course data
  this.courseTitle = course.title;
  this.courseDescription = course.description;
  this.courseMediaPath = course.mediaPath;
}

saveCourse() {
  if (this.isEditMode && this.editCourseId !== null) {
    // Update existing course
    const updatedCourse = {
      courseId: this.editCourseId,
      title: this.courseTitle,
      description: this.courseDescription,
      mediaPath: this.courseMediaPath
    };
    this.adminService.updateCourse(this.editCourseId, updatedCourse).subscribe({
      next: () => {
        this.loadCourses();
        this.resetForm();
      },
      error: (err) => console.error('Update course error:', err)
    });
  } else {
    // Add new course
    const newCourse = {
      title: this.courseTitle,
      description: this.courseDescription,
      mediaPath: this.courseMediaPath
    };
    this.adminService.addCourse(newCourse).subscribe({
      next: () => {
        this.loadCourses();
        this.resetForm();
      },
      error: (err) => console.error('Add course error:', err)
    });
  }
}

resetForm() {
  this.isEditMode = false;
  this.editCourseId = null;
  this.courseTitle = '';
  this.courseDescription = '';
  this.courseMediaPath = '';
}

  
  



}
