import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private http: HttpClient) {}

  getMyCourses(): Observable<{ success: boolean; data: any[] }> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{ success: boolean; data: any[] }>(
      'https://localhost:7228/api/Enrollment/my-courses',
      { headers }
    );
  }
  

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>('https://localhost:7228/api/User/profile', { headers });
  }
  
  

  updateProfile(profile: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<any>('https://localhost:7228/api/Student/profile', profile, { headers });
  }

  unenrollCourse(courseId: number): Observable<{ success: boolean; message: string }> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<{ success: boolean; message: string }>(
      `https://localhost:7228/api/Enrollment/unenroll/${courseId}`,
      { headers }
    );
  }

  getAllCourses(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>('https://localhost:7228/api/Course', { headers });
  }
  
  
  enrollCourse(userId: number, courseId: number, userName: string, courseTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    const body = {
      enrollmentId: 0,
      userId: userId,
      courseId: courseId,
      dateEnrolled: new Date().toISOString(),
      userName: userName,        // ✅ must be filled
      courseTitle: courseTitle   // ✅ must be filled
    };
  
    return this.http.post<any>(
      'https://localhost:7228/api/Enrollment/enroll',
      body,
      { headers }
    );
  }
  
  
  
  
  
  
  
}

