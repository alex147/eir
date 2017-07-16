import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'trial-summary',
    templateUrl: './trial-summary.component.html',
    styleUrls: ['./trial-summary.component.scss']
})
export class TrialSummaryComponent implements OnInit {

    public trialId: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit () {
        this.route.parent.params.forEach((params: Params) => {
            this.trialId = params['id'];
        });
    }

}
