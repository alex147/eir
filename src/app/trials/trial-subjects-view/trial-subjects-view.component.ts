import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'trial-subjects-view',
    templateUrl: './trial-subjects-view.component.html',
    styleUrls: ['./trial-subjects-view.component.scss']
})
export class TrialSubjectsViewComponent implements OnInit {

    public trialId: number;
    public isNavCollapsed: boolean;
    public iconDir: string;

    constructor(private route: ActivatedRoute) {
        this.isNavCollapsed = false;
        this.iconDir = 'left';
    }

    ngOnInit () {
        this.route.parent.params.forEach((params: Params) => {
            this.trialId = params['id'];
        });
    }

    toggleNavCollapsedState () {
        this.isNavCollapsed = !this.isNavCollapsed;
        this.iconDir = this.iconDir === 'left' ? 'right' : 'left';
    }

}
