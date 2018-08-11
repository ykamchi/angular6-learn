import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentuser = localStorage.getItem('currentuser');
        let token = localStorage.getItem('token')

        if (currentuser && token) {
            request = request.clone({
                setHeaders: { 
                    'Content-Type':  'application/json',
                    'x-access-token': token
                    
                }
            });
        }

        return next.handle(request);
    }
}