import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CenterService } from '../../trials/center.service';
import { TrialService } from '../../trials/trial.service';
import { Role } from '../role';
import { Center } from '../../trials/center';
import { Trial } from '../../trials/trial';

@Component({
    selector: 'admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

    public users: User[] = [];
    public centers: Center[] = [];
    public trials: Trial[] = [];
    public roles: any[] = [];
    public role: any = Role;
    public selectedUser: User;
    public isAddModalOpen: boolean;
    public isUpdateModalOpen: boolean;
    public isDeleteModalOpen: boolean;

    constructor(private userService: UserService, private centerService: CenterService, private trialService: TrialService) { }

    ngOnInit () {
        this.selectedUser = new User("", "", Role.Investigator, [], []);
        this.roles = Object.keys(Role)
            .filter((v: any) => !/\d/.test(v));
        this.userService.getUsers()
            .subscribe(data => this.users = data);
        this.centerService.getAllCenters()
            .subscribe(data => this.centers = data);
        this.trialService.getActiveTrials()
            .subscribe(data => this.trials = data);
    }

    onAdd () {
        this.isAddModalOpen = true;
    }

    onAddModalSubmitted () {
        this.userService.addUser(this.selectedUser)
            .subscribe(data => console.log(data));
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
