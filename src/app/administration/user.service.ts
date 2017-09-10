import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Role } from './role';

@Injectable()
export class UserService {

    public users: User[] = [
        new User('jdoe', 'John Doe', Role.Manager, [], []),
        new User('ikanchev', 'Ivan Kanchev', Role.Monitor, ['BGR001', 'BGR002'], ['LT1580_301', 'PM1331']),
        new User('givanov', 'Georgi Ivanov', Role.Investigator, ['BGR002'], ['LT1580_301'])
    ];

    constructor(private http: HttpClient) { }

    getUsers (): Observable<Array<User>> {
        return this.http.get<Array<User>>('/api/users');
    }

    addUser (user: User): Observable<User> {
        return this.http.post<User>('/api/users', user);
    }

    removeUser (username: string): Observable<User> {
        return this.http.delete<User>('/api/users/' + username);
    }

}
