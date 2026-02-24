import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7228/api';

  constructor(private http: HttpClient,private router: Router) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/register`, data);
  }

  getCourses(page: number = 1, pageSize: number = 10, search: string = '') {
    let url = `https://localhost:7228/api/Course/list?page=${page}&pageSize=${pageSize}`;
    if (search) {
      url += `&search=${search}`;
    }
    return this.http.get<any>(url);
  }
  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/']);  // clear JWT
    // optionally clear other user data
  }
  

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/User/profile`);
  }
  getEnrollmentDashboard() {
    return this.http.get<any>('https://localhost:7228/api/Enrollment/dashboard');
  }
  
  enrollCourse(userId: number, courseId: number, userName: string, courseTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(
      'https://localhost:7228/api/Enrollment/enroll',
      {
        enrollmentId: 0,          // backend will generate
        userId: userId,
        courseId: courseId,
        dateEnrolled: new Date().toISOString(),
        userName: userName,
        courseTitle: courseTitle
      },
      { headers }
    );
  }
  
  
  
  
  
}

