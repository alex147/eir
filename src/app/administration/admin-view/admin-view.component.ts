import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-view',
    templateUrl: './admin-view.component.html',
    styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

    public isNavCollapsed: boolean;
    public iconDir: string;

    constructor() {
        this.isNavCollapsed = false;
        this.iconDir = 'left';
    }

    ngOnInit () {
    }

    toggleNavCollapsedState () {
        this.isNavCollapsed = !this.isNavCollapsed;
        this.iconDir = this.iconDir === 'left' ? 'right' : 'left';
    }

}
