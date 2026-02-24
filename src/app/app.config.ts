import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { provideForms } from '@angular/forms';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //provideForms()   // ✅ enables ngModel
  ]
};
;


