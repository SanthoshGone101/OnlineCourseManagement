import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminGuard } from './guards/admin.guard';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseListComponent } from './courses/course-list/course-list.component';




export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent },  // ✅ main page shows both
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
{ path: 'admin/users', component: AdminUsersComponent },
{ path: 'admin/courses', component: AdminCoursesComponent },
{ path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
 { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard] },
  { path: 'admin/courses', component: AdminCoursesComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' },
  { path: 'admin/users', component: AdminUsersComponent },
 
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' }, // default route
  { path: 'my-courses', component: CourseListComponent },
  { path: 'courses', component: CourseDetailComponent },  // My Courses


  



];
