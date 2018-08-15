import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
    
    constructor(private http: HttpClient, private config: ConfigService) {}

    login(username: string, password: string) {
        let uri = this.config.getParam('backend_uri');
        return this.http.post<any>(`${uri}/indices/users/auth`, { username: `${username}`, password: `${password}` })
            .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
                console.log("store currentUser"+res.token);
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentuser', res.username);
                    localStorage.setItem('token', res.token);
                    
                    
                }
            }));
    }

    register(username: string, password: string) {
        let uri = this.config.getParam('backend_uri');
        return this.http.post<any>(`${uri}/indices/users/reg`, { username: `${username}`, password: `${password}` });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentuser');
        localStorage.removeItem('token');
    }
} 
