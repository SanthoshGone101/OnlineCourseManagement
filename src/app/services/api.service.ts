import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private userUrl = `${this.baseUrl}/User`;
  private courseUrl = `${this.baseUrl}/Course`;
  private enrollmentUrl = `${this.baseUrl}/Enrollment`;

  constructor(private http: HttpClient, private router: Router) {}

  // Authentication
  login(data: any): Observable<any> {
    return this.http.post(`${this.userUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.userUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);  // clear JWT and redirect
  }

  // Profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.userUrl}/profile`);
  }

  // Courses
  getCourses(page: number = 1, pageSize: number = 10, search: string = '') {
    let url = `${this.courseUrl}/list?page=${page}&pageSize=${pageSize}`;
    if (search) {
      url += `&search=${search}`;
    }
    return this.http.get<any>(url);
  }

  // Enrollment
  getEnrollmentDashboard(): Observable<any> {
    return this.http.get<any>(`${this.enrollmentUrl}/dashboard`);
  }

  enrollCourse(userId: number, courseId: number, userName: string, courseTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(
      `${this.enrollmentUrl}/enroll`,
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
