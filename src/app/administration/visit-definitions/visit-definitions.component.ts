import { Component, OnInit } from '@angular/core';
import { TrialService } from '../../trials/trial.service';
import { Trial } from '../../trials/trial';
import { VisitDefinitionsService } from '../../trials/visit-definitions.service';
import { VisitDefinition } from '../../trials/visit-definition';
import { SectionDefinition } from '../../trials/section-definition';

@Component({
    selector: 'admin-visit-definitions',
    templateUrl: './visit-definitions.component.html',
    styleUrls: ['./visit-definitions.component.scss']
})
export class VisitDefinitionsComponent implements OnInit {

    public selectedTrial: Trial;
    public visitId: number = 1;
    public visits: number[] = [1];
    public trials: Trial[];
    public definitions: VisitDefinition[];
    public selectedSection: SectionDefinition;
    public isDeleteModalOpen: boolean;

    constructor(private trialService: TrialService,
        private visitDefinitionsService: VisitDefinitionsService) { }

    ngOnInit () {
        this.selectedSection = new SectionDefinition("", "", "");
        this.trialService.getActiveTrials()
            .subscribe((data) => {
                this.trials = data;
                this.selectedTrial = this.trials[0];
                this.fetchVisitDefinitions();
            });
    }

    fetchVisitDefinitions () {
        this.visits = Array.apply(null, Array(this.selectedTrial
            .numOfVisits)).map(function (_, i) { return i + 1; });
        this.visitDefinitionsService
            .getTrialDefinitionsById(this.selectedTrial.id)
            .subscribe((data) => {
                if (data) {
                    this.definitions = data.visitDefinitions;
                }
            });
    }

    onDelete (section: SectionDefinition) {
        this.isDeleteModalOpen = true;
        this.selectedSection = section;
    }

    onDeleteModalSubmitted () {
        this.visitDefinitionsService.removeSection(this.selectedSection.id, this.selectedTrial.id, this.visitId)
            .subscribe(data => console.log("Deleted section", data));
        this.onDeleteModalDismissed();
    }

    onDeleteModalDismissed () {
        this.visitDefinitionsService.getTrialDefinitionsById(this.selectedTrial.id)
            .subscribe((data) => {
                if (data) {
                    this.definitions = data.visitDefinitions;
                }
                this.isDeleteModalOpen = false;
            });
    }
}
