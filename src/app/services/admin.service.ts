import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'https://localhost:7228/api/Admin';

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
      'Content-Type': 'application/json'   // ✅ ensure JSON type
    };
    return this.http.put<any>(
      `https://localhost:7228/api/Enrollment/users/${id}/role`,
      JSON.stringify(role),   // ✅ stringify the string
      { headers }
    );
  }
  
  
  
  
  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<any>(
      `https://localhost:7228/api/Enrollment/users/${id}`,   // ✅ correct endpoint
      { headers }
    );
  }
  
  

  // Course management
  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, course);
  }

 


  getEnrollmentUsers(): Observable<any> {
    const token = localStorage.getItem('token');   // ✅ get JWT
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>('https://localhost:7228/api/Enrollment/users', { headers });
  }
 
// Get all courses
getCourses(): Observable<any[]> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.get<any[]>('https://localhost:7228/api/Course', { headers });
}

// Get single course by id
getCourseById(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.get<any>(`https://localhost:7228/api/Course/${id}`, { headers });
}

// Add new course
addCourse(course: { title: string; description: string; mediaPath?: string }): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.post<any>('https://localhost:7228/api/Course/create', course, { headers });
}

// Update course
updateCourse(id: number, course: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.put<any>(`https://localhost:7228/api/Course/${id}`, course, { headers });
}

deleteCourse(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.delete<any>(`https://localhost:7228/api/Course/${id}`, { headers });
}


  
  
  
  
  
  
  
}
