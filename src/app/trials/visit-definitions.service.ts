import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
        new Question("weight", "Weight", QuestionType.PDecimal, true, "Measured on an empty stomach."),
        new Question("height", "Height", QuestionType.PDecimal, true, "Measured with the shoes taken off."),
        new Question("age", "Age", QuestionType.PNumber, true, "Age at start of trial.")
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
        new VisitDefinition(this.sections),
        new VisitDefinition(this.sections),
        new VisitDefinition(this.sections)
    ];
    private definitions: TrialDefinition[] = [
        new TrialDefinition("ABC1", this.visits),
        new TrialDefinition("ABC2", this.visits),
        new TrialDefinition("ABC3", this.visits),
        new TrialDefinition("ABC4", this.visits),
        new TrialDefinition("ABC5", this.visits)
    ];

    constructor(private http: HttpClient) { }

    getTrialDefinitionsById (trialId: string):
        Observable<TrialDefinition> {
        return this.http.get<TrialDefinition>('/api/definitions/' + trialId);
    }

    getSection (trialId: string, visitId: number, sectionId: string):
        Observable<SectionDefinition> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('visitId', visitId.toString());
        queryParams = queryParams.set('sectionId', sectionId);

        return this.http.get<SectionDefinition>('/api/definitions/' + trialId + '/section', {
            params: queryParams
        });
    }

    addSection (section: SectionDefinition, trialId: string, visitId: number): Observable<SectionDefinition> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('visitId', visitId.toString());

        return this.http.post<SectionDefinition>('/api/definitions/' + trialId, section, {
            params: queryParams
        });
    }

    updateSection (section: SectionDefinition, trialId: string, visitId: number): Observable<SectionDefinition> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('visitId', visitId.toString());
        queryParams = queryParams.set('sectionId', section.id);

        return this.http.put<SectionDefinition>('/api/definitions/' + trialId, section, {
            params: queryParams
        });
    }

    removeSection (sectionId: string, trialId: string, visitId: number): Observable<SectionDefinition> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('visitId', visitId.toString());
        queryParams = queryParams.set('sectionId', sectionId);

        return this.http.delete<SectionDefinition>('/api/definitions/' + trialId, {
            params: queryParams
        });
    }

}
