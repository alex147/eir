import { Component, OnInit } from '@angular/core';
import { AdminOption } from '../../common/model/admin-option';

@Component({
    selector: '[admin-options]',
    templateUrl: './admin-options.component.html',
    styleUrls: ['./admin-options.component.scss']
})
export class AdminOptionsComponent implements OnInit {

    public filterString: string;
    public options: AdminOption[] = [
        new AdminOption("Users", "users")
    ];

    constructor() { }

    ngOnInit () {
    }

    clearFilter () {
        this.filterString = '';
    }

}
