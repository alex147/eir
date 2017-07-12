import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'trial-subjects-view',
    templateUrl: './trial-subjects-view.component.html',
    styleUrls: ['./trial-subjects-view.component.scss']
})
export class TrialSubjectsViewComponent implements OnInit {

    public trialId: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit () {
        this.route.parent.params.forEach((params: Params) => {
            this.trialId = params['id'];
        });
    }

}
