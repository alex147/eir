import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../../common/model/user';

@Component({
    selector: 'admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

    @HostBinding('class') classes = 'content-area';

    public users: User[] = [
        new User('jdoe', 'John Doe', 'Project Manager', [], []),
        new User('ikanchev', 'Ivan Kanchev', 'CRA', ['BGR001', 'BGR002'], ['LT1580_301', 'PM1331']),
        new User('givanov', 'Georgi Ivanov', 'Investigator', ['BGR002'], ['LT1580_301'])
    ];

    public isModalOpen: boolean;

    constructor() { }

    ngOnInit () {
    }

    onEdit (user: User) {
        this.isModalOpen = true;
    }

    onDelete (user: User) {
        this.users = this.users.filter((toCompare: User) => {
            return user.username !== toCompare.username;
        });
    }

    onModalSubmitted () {
        this.isModalOpen = false;
    }

}
