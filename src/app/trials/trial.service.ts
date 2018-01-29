import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Trial } from './trial';

@Injectable()
export class TrialService {

    public archivedTrials: Trial[] = [
        new Trial('QWE1', 'Tchaikapharma', 'Old and forgotten trial', ['BGR001'], 7),
        new Trial('QWE2', 'Made-Up Pharmaceutical', 'Another old trial', ['BGR001', 'BGR002'], 5)
    ];

    constructor(private http: HttpClient) { }

    getMyTrials (): Observable<Trial[]> {
        return this.http.get<Array<Trial>>('/api/trials');
    }

    getActiveTrials (): Observable<Trial[]> {
        return this.http.get<Array<Trial>>('/api/trials');
    }

    getArchivedTrials (): Observable<Trial[]> {
        return Observable.of(this.archivedTrials);
    }

    getTrial (id: string): Observable<Trial> {
        return this.http.get<Trial>('/api/trials/' + id);
    }

    addTrial (trial: Trial): Observable<Trial> {
        return this.http.post<Trial>('/api/trials/', trial);
    }

    updateTrial (trial: Trial): Observable<Trial> {
        return this.http.put<Trial>('/api/trials/' + trial.id, trial);
    }

    removeTrial (id: string): Observable<Trial> {
        return this.http.delete<Trial>('/api/trials/' + id);
    }
}
