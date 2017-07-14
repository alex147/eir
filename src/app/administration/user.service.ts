import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from './user';

@Injectable()
export class UserService {

    public users: User[] = [
        new User('jdoe', 'John Doe', 'Project Manager', [], []),
        new User('ikanchev', 'Ivan Kanchev', 'CRA', ['BGR001', 'BGR002'], ['LT1580_301', 'PM1331']),
        new User('givanov', 'Georgi Ivanov', 'Investigator', ['BGR002'], ['LT1580_301'])
    ];

    constructor() { }

    getUsers() {
        return Observable.of(this.users);
    }

}
