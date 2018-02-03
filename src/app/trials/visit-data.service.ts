import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { VisitData } from './visit-data';
import { VisitInstance } from './visit-instance';
import { SectionData } from './section-data';
import { SectionStatus } from './section-status';

@Injectable()
export class VisitDataService {

    private sectionData: SectionData[] = [
        new SectionData("vitals", "Vital Signs", SectionStatus.Completed, []),
        new SectionData("habits", "Habits Information", SectionStatus.InProgress, []),
        new SectionData("demographics", "Demographic Information", SectionStatus.NotStarted, [])
    ];

    private visits: VisitInstance[] = [
        new VisitInstance(1, this.sectionData, "First Visit"),
        new VisitInstance(2, this.sectionData, "Second Visit"),
        new VisitInstance(3, this.sectionData, "Third Visit")
    ];

    private data: VisitData[] = [
        new VisitData("BGR001-001", this.visits),
        new VisitData("BGR001-002", this.visits),
        new VisitData("BGR001-003", this.visits),
        new VisitData("BGR002-001", this.visits),
        new VisitData("BGR002-002", this.visits),
        new VisitData("BGR002-003", this.visits)
    ];

    constructor(private http: HttpClient) { }

    getVisitDataBySiteId (siteId: string): Observable<VisitData[]> {
        // return Observable.of(this.data
        //     .filter(data => data.subjectId.indexOf(siteId) >= 0));
        let queryParams: HttpParams = new HttpParams();
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
