import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from './subject';

@Injectable()
export class SubjectService {

    constructor(private http: HttpClient) { }

    getSubjectsByTrialIdAndSiteId (trialId: string, siteId: string): Observable<Subject[]> {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('trialId', trialId);
        queryParams = queryParams.set('siteId', siteId);

        return this.http.get<Array<Subject>>('/api/subjects', {params: queryParams});
    }

    addSubject (subject: Subject): Observable<Subject> {
        return this.http.post<Subject>('/api/subjects/', subject);
    }

    updateSubject (subject: Subject): Observable<Subject> {
        return this.http.put<Subject>('/api/subjects/' + subject.id, subject);
    }

    removeSubject (id: string): Observable<Subject> {
        return this.http.delete<Subject>('/api/subjects/' + id);
    }

}
