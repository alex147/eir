import { Component, OnInit } from '@angular/core';
import { Trial } from '../../trials/trial';
import { Center } from '../../trials/center';
import { TrialService } from '../../trials/trial.service';
import { CenterService } from '../../trials/center.service';

@Component({
    selector: 'admin-active-trials',
    templateUrl: './admin-active-trials.component.html',
    styleUrls: ['./admin-active-trials.component.scss']
})
export class AdminActiveTrialsComponent implements OnInit {

    public activeTrials: Trial[] = [];
    public selectedTrial: Trial;
    public centers: Center[] = [];
    public isAddModalOpen: boolean;
    public isUpdateModalOpen: boolean;
    public isDeleteModalOpen: boolean;

    constructor(private trialService: TrialService,
                private centerService: CenterService) { }

    ngOnInit () {
        this.selectedTrial = new Trial("", "", "", [], 0);
        this.trialService.getActiveTrials()
            .subscribe(data => this.activeTrials = data);
        this.centerService.getAllCenters()
            .subscribe(data => this.centers = data);
    }

    onAdd () {
        this.selectedTrial = new Trial("", "", "", [], 0);
        this.isAddModalOpen = true;
    }

    onAddModalSubmitted () {
        if (this.activeTrials.indexOf(this.selectedTrial) !== -1) {
            this.trialService.updateTrial(this.selectedTrial)
                .subscribe(data => console.log(data));
        } else {
            this.trialService.addTrial(this.selectedTrial)
                .subscribe(data => console.log(data));
        }
        this.onAddModalDismissed();
    }

    onAddModalDismissed () {
        this.trialService.getActiveTrials()
            .subscribe(data => {
                this.activeTrials = data;
                this.isAddModalOpen = false;
            });
    }

    onEdit (trial: Trial) {
        this.selectedTrial = trial;
        this.isAddModalOpen = true;
    }

    onDelete (trial: Trial) {
        this.isDeleteModalOpen = true;
        this.selectedTrial = trial;
    }

    onDeleteModalSubmitted () {
        this.trialService.removeTrial(this.selectedTrial.id)
            .subscribe(data => console.log("Deleted trial", data));
        this.onDeleteModalDismissed();
    }

    onDeleteModalDismissed () {
        this.trialService.getActiveTrials()
            .subscribe(data => {
                this.activeTrials = data;
                this.isDeleteModalOpen = false;
            });
    }
}
