import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
    import { TrialDefinition } from './trial-definition';
import { SectionDefinition } from './section-definition';

@Injectable()
export class VisitDefinitionsService {

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
