import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Role } from '../role';

@Component({
    selector: 'admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

    public users: User[];
    public role: any = Role;

    public isModalOpen: boolean;

    constructor(private userService: UserService) { }

    ngOnInit () {
        this.users = this.userService.getUsers();
    }

    onAdd () {

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
