import { Component, OnInit, HostBinding } from '@angular/core';
import { Trial } from '../../trials/trial';
import { TrialService } from '../../trials/trial.service';

@Component({
    selector: 'app-admin-active-trials',
    templateUrl: './admin-active-trials.component.html',
    styleUrls: ['./admin-active-trials.component.scss']
})
export class AdminActiveTrialsComponent implements OnInit {

    @HostBinding('class') classes = 'content-area';

    public activeTrials: Trial[];
    public isModalOpen: boolean;

    constructor(private trialService: TrialService) { }

    ngOnInit () {
        this.trialService.getActiveTrials()
            .subscribe(data => this.activeTrials = data);
    }

    onAdd () {

    }

    onEdit (trial: Trial) {
        this.isModalOpen = true;
    }

    onDelete (trial: Trial) {
        this.activeTrials = this.activeTrials.filter((toCompare: Trial) => {
            return trial.id !== toCompare.id;
        });
    }

    onModalSubmitted () {
        this.isModalOpen = false;
    }

}

