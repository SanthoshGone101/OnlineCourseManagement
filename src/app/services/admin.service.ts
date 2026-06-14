import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';


@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiUrl}/Admin`;
  private enrollmentUrl = `${environment.apiUrl}/Enrollment`;
  private courseUrl = `${environment.apiUrl}/Course`;

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard`);
  }

  // User management
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  updateUserRole(id: number, role: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<any>(
      `${this.enrollmentUrl}/users/${id}/role`,
      JSON.stringify(role),
      { headers }
    );
  }

  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<any>(`${this.enrollmentUrl}/users/${id}`, { headers });
  }

  // Course management
  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, course);
  }

  getEnrollmentUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.enrollmentUrl}/users`, { headers });
  }

  // Get all courses
  getCourses(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.courseUrl}`, { headers });
  }

  // Get single course by id
  getCourseById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.courseUrl}/${id}`, { headers });
  }

  // Add new course
  addCourse(course: { title: string; description: string; mediaPath?: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(`${this.courseUrl}/create`, course, { headers });
  }

  // Update course
  updateCourse(id: number, course: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<any>(`${this.courseUrl}/${id}`, course, { headers });
  }

  deleteCourse(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<any>(`${this.courseUrl}/${id}`, { headers });
  }
}
