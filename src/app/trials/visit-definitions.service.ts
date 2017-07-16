import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TrialVisitDefinitions } from './trial-visit-definitions';
import { VisitDefinition } from './visit-definition';
import { Metric } from './metric';
import { MetricType } from './metric-type';

@Injectable()
export class VisitDefinitionsService {

    private metrics: Metric[] = [
        new Metric("Weight", MetricType.Number, "Measured on an empty stomach."),
        new Metric("Height", MetricType.Number, "Measured with the shoes taken off."),
        new Metric("Age", MetricType.Number, "Age at start of trial.")
    ];
    private visits: VisitDefinition[] = [
        new VisitDefinition("First Visit", this.metrics),
        new VisitDefinition("Second Visit", this.metrics),
        new VisitDefinition("Third Visit", this.metrics)
    ];
    private definitions: TrialVisitDefinitions[] = [
        new TrialVisitDefinitions("1", this.visits),
        new TrialVisitDefinitions("2", this.visits),
        new TrialVisitDefinitions("3", this.visits),
        new TrialVisitDefinitions("4", this.visits),
        new TrialVisitDefinitions("5", this.visits)
    ];

    constructor() {
    }

    getTrialDefinitionsByTrialId (trialId: string): Observable<TrialVisitDefinitions> {
        return Observable.of(this.definitions
            .filter(definition => definition.trialId === trialId)[0]);
    }

}
