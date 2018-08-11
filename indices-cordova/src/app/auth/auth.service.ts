import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
    uri = 'http://10.0.0.12:4000';
    

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        /*return this.http.post<any>(`${this.uri}/indices/users/auth`, { username: `${username}`, password: `${password}` }).subscribe((res) => {
            console.log("store currentUser");
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
            }
        });*/
        return this.http.post<any>(`${this.uri}/indices/users/auth`, { username: `${username}`, password: `${password}` })
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
        console.log("register");
        return this.http.post<any>(`${this.uri}/indices/users/reg`, { username: `${username}`, password: `${password}` });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentuser');
        localStorage.removeItem('token');
    }
} 
