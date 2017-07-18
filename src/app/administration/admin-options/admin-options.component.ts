import { Component, OnInit } from '@angular/core';
import { AdminOption } from '../admin-option';

@Component({
    selector: '[admin-options]',
    templateUrl: './admin-options.component.html',
    styleUrls: ['./admin-options.component.scss']
})
export class AdminOptionsComponent implements OnInit {

    public userOptions: AdminOption[] = [
        new AdminOption("Users & Privileges", "users")
    ];

    public trialOptions: AdminOption[] = [
        new AdminOption("Ongoing Trials", "trials"),
        new AdminOption("Archived Trials", "archive")
    ];

    public centerOptions: AdminOption[] = [
        new AdminOption("Enrolled Centers", "centers"),
    ];

    public visitOptions: AdminOption[] = [
        new AdminOption("Visit Definitions", "visits")
    ];

    constructor() { }

    ngOnInit () {
    }

}
