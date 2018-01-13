import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { SiteService } from '../../trials/site.service';
import { TrialService } from '../../trials/trial.service';
import { Role } from '../role';
import { Site } from '../../trials/site';
import { Trial } from '../../trials/trial';

@Component({
    selector: 'admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

    public users: User[] = [];
    public sites: Site[] = [];
    public trials: Trial[] = [];
    public roles: any[] = [];
    public role: any = Role;
    public selectedUser: User;
    public isAddModalOpen: boolean;
    public isUpdateModalOpen: boolean;
    public isDeleteModalOpen: boolean;

    constructor(private userService: UserService, private siteService: SiteService, private trialService: TrialService) { }

    ngOnInit () {
        this.selectedUser = new User("", "", "", Role.Investigator, [], []);
        this.roles = Object.keys(Role)
            .filter((v: any) => !/\d/.test(v));
        this.userService.getUsers()
            .subscribe(data => this.users = data);
        this.siteService.getAllSites()
            .subscribe(data => this.sites = data);
        this.trialService.getActiveTrials()
            .subscribe(data => this.trials = data);
    }

    onAdd () {
        this.selectedUser = new User("", "", "", Role.Investigator, [], []);
        this.isAddModalOpen = true;
    }

    onAddModalSubmitted () {
        if (this.users.indexOf(this.selectedUser) !== -1) {
            this.userService.updateUser(this.selectedUser)
                .subscribe(data => console.log(data));
        } else {
            this.userService.addUser(this.selectedUser)
                .subscribe(data => console.log(data));
        }
        this.onAddModalDismissed();
    }

    onAddModalDismissed () {
        this.userService.getUsers()
        .subscribe(data => {
            this.users = data;
            this.isAddModalOpen = false;
        });
    }

    onEdit (user: User) {
        this.selectedUser = user;
        this.isAddModalOpen = true;
    }

    onDelete (user: User) {
        this.isDeleteModalOpen = true;
        this.selectedUser = user;
    }

    onDeleteModalSubmitted () {
        this.userService.removeUser(this.selectedUser.username)
            .subscribe(data => console.log("Deleted user", data));
        this.onDeleteModalDismissed();
    }

    onDeleteModalDismissed () {
        this.userService.getUsers()
        .subscribe(data => {
            this.users = data;
            this.isDeleteModalOpen = false;
        });
    }

}
