import { Component, OnInit } from '@angular/core';
import { AdminOption } from '../../common/model/admin-option';

@Component({
    selector: '[admin-options]',
    templateUrl: './admin-options.component.html',
    styleUrls: ['./admin-options.component.scss']
})
export class AdminOptionsComponent implements OnInit {

    public userOptions: AdminOption[] = [
        new AdminOption("Users", "users")
    ];

    public trialOptions: AdminOption[] = [
        new AdminOption("Ongoing Trials", "trials"),
        new AdminOption("Archived Trials", "archive")
    ];

    constructor() { }

    ngOnInit () {
    }

}
