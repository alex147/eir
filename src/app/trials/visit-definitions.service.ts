import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TrialDefinition } from './trial-definition';
import { VisitDefinition } from './visit-definition';
import { MetricDefinition } from './metric-definition';
import { MetricType } from './metric-type';
import { SectionDefinition } from './section-definition';

@Injectable()
export class VisitDefinitionsService {

    private metrics: MetricDefinition[] = [
        new MetricDefinition("Weight", MetricType.Number, "Measured on an empty stomach."),
        new MetricDefinition("Height", MetricType.Number, "Measured with the shoes taken off."),
        new MetricDefinition("Age", MetricType.Number, "Age at start of trial.")
    ];
    private sections: SectionDefinition[] = [
        new SectionDefinition("vitals", "Vital Signs", "", this.metrics),
        new SectionDefinition("habits", "Habits Information", "", this.metrics),
        new SectionDefinition("demographics", "Demographic Information", "", this.metrics)
    ];

    private visits: VisitDefinition[] = [
        new VisitDefinition("First Visit", this.sections),
        new VisitDefinition("Second Visit", this.sections),
        new VisitDefinition("Third Visit", this.sections)
    ];
    private definitions: TrialDefinition[] = [
        new TrialDefinition("1", this.visits),
        new TrialDefinition("2", this.visits),
        new TrialDefinition("3", this.visits),
        new TrialDefinition("4", this.visits),
        new TrialDefinition("5", this.visits)
    ];

    constructor() {
    }

    getTrialDefinitionsById (trialId: string):
        Observable<TrialDefinition> {
        return Observable.of(this.definitions
            .filter(definition => definition.trialId === trialId)[0]);
    }

    getNumOfVisitsByTrialId (trialId: string): Observable<number> {
        return Observable.of(this.definitions
            .filter(definition => definition.trialId === trialId)[0].visitDefinitions.length);
    }

    getSection (trialId: string, visitId: number, sectionId: string):
        Observable<SectionDefinition> {
        let matchedTrial: TrialDefinition = this.definitions
            .filter(definition => definition.trialId === trialId)[0];
        let matchedSections: SectionDefinition[] = matchedTrial.visitDefinitions[visitId].sections;
        return Observable.of(matchedSections
            .filter(section => section.id === sectionId)[0]);
    }

}
