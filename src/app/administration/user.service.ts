import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from './user';
import { Role } from './role';

@Injectable()
export class UserService {

    public users: User[] = [
        new User('jdoe', 'John Doe', Role.Manager, [], []),
        new User('ikanchev', 'Ivan Kanchev', Role.Monitor, ['BGR001', 'BGR002'], ['LT1580_301', 'PM1331']),
        new User('givanov', 'Georgi Ivanov', Role.Investigator, ['BGR002'], ['LT1580_301'])
    ];

    constructor() { }

    getUsers() {
        return Observable.of(this.users);
    }

}
