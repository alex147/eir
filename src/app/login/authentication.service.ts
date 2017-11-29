import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoginCredentials } from './login-credentials';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login (credentials: LoginCredentials): Observable<any> {
        return this.http.post('/api/auth/login', credentials)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user: any = response;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isUserLoggedIn(): boolean {
        return !!localStorage.getItem('currentUser');
    }
}
