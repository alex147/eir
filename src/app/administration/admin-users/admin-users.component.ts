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

    public users: User[] = [];
    public role: any = Role;
    public selectedUser: User;
    public isAddModalOpen: boolean;
    public isUpdateModalOpen: boolean;
    public isDeleteModalOpen: boolean;

    constructor(private userService: UserService) { }

    ngOnInit () {
        this.selectedUser = new User("", "", Role.Investigator, [], []);
        this.userService.getUsers()
            .subscribe(data => this.users = data);
    }

    onAdd () {
        this.isAddModalOpen = true;
    }

    onAddModalSubmitted () {
        this.userService.addUser(this.selectedUser);
        this.onAddModalDismissed();
    }

    onAddModalDismissed () {
        this.isAddModalOpen = false;
    }

    onEdit (user: User) {
        this.isAddModalOpen = true;
    }

    onDelete (user: User) {
        this.isDeleteModalOpen = true;
        this.selectedUser = user;
    }

    onDeleteModalSubmitted () {
        this.userService.removeUser(this.selectedUser.username);
        this.onDeleteModalDismissed();
    }

    onDeleteModalDismissed () {
        this.isDeleteModalOpen = false;
    }

}
