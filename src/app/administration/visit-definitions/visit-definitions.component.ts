import { Component, OnInit } from '@angular/core';
import { TrialService } from '../../trials/trial.service';
import { Trial } from '../../trials/trial';
import { VisitDefinitionsService } from '../../trials/visit-definitions.service';
import { VisitDefinition } from '../../trials/visit-definition';
import { Metric } from '../../trials/metric';
import { MetricType } from '../../trials/metric-type';

@Component({
    selector: 'app-visit-definitions',
    templateUrl: './visit-definitions.component.html',
    styleUrls: ['./visit-definitions.component.scss']
})
export class VisitDefinitionsComponent implements OnInit {

    public trialId: string = "";
    public visitId: number = 1;
    public visits: number[] = [1];
    public trials: Trial[];
    public definitions: VisitDefinition[];
    public mType: any = MetricType;

    constructor(private trialService: TrialService,
        private visitDefinitionsService: VisitDefinitionsService) { }

    ngOnInit () {
        this.trialService.getActiveTrials()
            .subscribe((data) => {
                this.trials = data;
                this.trialId = this.trials[0].id;
                this.fetchVisitDefinitions();
            });
    }

    fetchVisitDefinitions () {
        this.visitDefinitionsService.getTrialDefinitionsByTrialId(this.trialId)
            .subscribe((data) => {
                this.definitions = data.visitDefinitions;
                this.visits = Array.apply(null, Array(this.definitions.length))
                    .map(function (_, i) { return i + 1; });
            });
    }

    onAdd () {

    }

    onEdit (metric: Metric) {

    }

    onDelete (metric: Metric) {

    }

}
