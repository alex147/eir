import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './user';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers (): Observable<Array<User>> {
        return this.http.get<Array<User>>('/api/users');
    }

    addUser (user: User): Observable<User> {
        return this.http.post<User>('/api/users/', user)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateUser (user: User): Observable<User> {
        return this.http.put<User>('/api/users/' + user.username, user)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    removeUser (username: string): Observable<User> {
        return this.http.delete<User>('/api/users/' + username)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
