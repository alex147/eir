import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'trial-summary',
    templateUrl: './trial-summary.component.html',
    styleUrls: ['./trial-summary.component.scss']
})
export class TrialSummaryComponent implements OnInit {

    public trialId: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit () {
        this.trialId = this.route.snapshot.parent.params["id"];
    }

}
