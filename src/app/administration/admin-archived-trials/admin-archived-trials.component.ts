import { Component, OnInit, HostBinding } from '@angular/core';
import { Trial } from '../../trials/trial';
import { TrialService } from '../../trials/trial.service';

@Component({
    selector: 'app-admin-archived-trials',
    templateUrl: './admin-archived-trials.component.html',
    styleUrls: ['./admin-archived-trials.component.scss']
})
export class AdminArchivedTrialsComponent implements OnInit {

    @HostBinding('class') classes = 'content-area';
    public archivedTrials: Trial[];

    constructor(private trialService: TrialService) { }

    ngOnInit () {
        this.trialService.getActiveTrials()
            .subscribe(data => this.archivedTrials = data);
    }

}
