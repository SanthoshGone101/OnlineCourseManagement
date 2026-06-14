import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';  // ✅ correct import

@Injectable({ providedIn: 'root' })
export class StudentService {
  private enrollmentUrl = `${environment.apiUrl}/Enrollment`;
  private userUrl = `${environment.apiUrl}/User`;
  private studentUrl = `${environment.apiUrl}/Student`;
  private courseUrl = `${environment.apiUrl}/Course`;

  constructor(private http: HttpClient) {}

  getMyCourses(): Observable<{ success: boolean; data: any[] }> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.enrollmentUrl}/my-courses`,
      { headers }
    );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.userUrl}/profile`, { headers });
  }

  updateProfile(profile: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<any>(`${this.studentUrl}/profile`, profile, { headers });
  }

  unenrollCourse(courseId: number): Observable<{ success: boolean; message: string }> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.enrollmentUrl}/unenroll/${courseId}`,
      { headers }
    );
  }

  getAllCourses(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.courseUrl}`, { headers });
  }

  enrollCourse(userId: number, courseId: number, userName: string, courseTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const body = {
      enrollmentId: 0,
      userId: userId,
      courseId: courseId,
      dateEnrolled: new Date().toISOString(),
      userName: userName,
      courseTitle: courseTitle
    };

    return this.http.post<any>(`${this.enrollmentUrl}/enroll`, body, { headers });
  }
}
