import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'trial-summary-view',
    templateUrl: './trial-summary-view.component.html',
    styleUrls: ['./trial-summary-view.component.scss']
})
export class TrialSummaryViewComponent implements OnInit {

    public trialId: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit () {
        this.route.params.forEach((params: Params) => {
            this.trialId = params['id'];
        });
    }

}
