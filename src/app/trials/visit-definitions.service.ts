import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TrialDefinition } from './trial-definition';
import { VisitDefinition } from './visit-definition';
import { Question } from './question';
import { QuestionType } from './question-type';
import { SectionDefinition } from './section-definition';

@Injectable()
export class VisitDefinitionsService {

    private questions: Question[] = [
        new Question("weight", "Weight", QuestionType.PDecimal, 1, true, "Measured on an empty stomach."),
        new Question("height", "Height", QuestionType.PDecimal, 2, true, "Measured with the shoes taken off."),
        new Question("age", "Age", QuestionType.PNumber, 3, true, "Age at start of trial.")
    ];
    private sections: SectionDefinition[] = [
        new SectionDefinition("vitals", "Vital Signs", `
            This section aims at capturing the Vital Signs for the subject in question.
        `, this.questions),
        new SectionDefinition("habits", "Habits Information", `
            This section aims at capturing the Habits for the subject in question.
        `, this.questions),
        new SectionDefinition("demographics", "Demographic Information", `
            This section aims at capturing the Demographic Information for the subject in question.
        `, this.questions)
    ];

    private visits: VisitDefinition[] = [
        new VisitDefinition("First Visit", this.sections),
        new VisitDefinition("Second Visit", this.sections),
        new VisitDefinition("Third Visit", this.sections)
    ];
    private definitions: TrialDefinition[] = [
        new TrialDefinition("ABC1", this.visits),
        new TrialDefinition("ABC2", this.visits),
        new TrialDefinition("ABC3", this.visits),
        new TrialDefinition("ABC4", this.visits),
        new TrialDefinition("ABC5", this.visits)
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
        let matchedSections: SectionDefinition[] = matchedTrial.visitDefinitions[visitId - 1].sections;
        return Observable.of(matchedSections
            .filter(section => section.id === sectionId)[0]);
    }

}
