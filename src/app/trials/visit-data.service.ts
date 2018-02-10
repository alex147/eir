import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { VisitData } from './visit-data';
import { SectionData } from './section-data';

@Injectable()
export class VisitDataService {

    constructor(private http: HttpClient) { }

    getVisitDataBySiteId (siteId: string, trialId: string): Observable<VisitData[]> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('trialId', trialId);
        queryParams = queryParams.set('siteId', siteId);

        return this.http.get<VisitData[]>('/api/data', {
            params: queryParams
        });
    }

    getSectionData (subjectId: string, visitId: number, sectionId: string): Observable<SectionData> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('visitId', visitId.toString());
        queryParams = queryParams.set('sectionId', sectionId);

        return this.http.get<SectionData>('/api/data/' + subjectId, {
            params: queryParams
        });
    }

    saveSectionData (subjectId: string, visitId: number, sectionId: string, data: SectionData): Observable<SectionData> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('visitId', visitId.toString());
        queryParams = queryParams.set('sectionId', sectionId);

        return this.http.put<SectionData>('/api/data/' + subjectId, data, {
            params: queryParams
        });
    }
}
