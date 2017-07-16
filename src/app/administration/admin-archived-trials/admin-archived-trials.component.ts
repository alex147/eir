import { Component, OnInit } from '@angular/core';
import { Trial } from '../../trials/trial';
import { TrialService } from '../../trials/trial.service';

@Component({
    selector: 'app-admin-archived-trials',
    templateUrl: './admin-archived-trials.component.html',
    styleUrls: ['./admin-archived-trials.component.scss']
})
export class AdminArchivedTrialsComponent implements OnInit {

    public archivedTrials: Trial[];

    constructor(private trialService: TrialService) { }

    ngOnInit () {
        this.trialService.getArchivedTrials()
            .subscribe(data => this.archivedTrials = data);
    }

}
