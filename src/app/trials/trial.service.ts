import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Trial } from './trial';

@Injectable()
export class TrialService {

    public trials: Trial[] = [
        new Trial("ABC1", "Novo Nordisk", "Novo Nordisk Trial", ['BGR001', 'BGR002'], 3),
        new Trial("ABC2", "Berlin-Chemie", "Berlin-Chemie Trial", ['BGR001', 'BGR002'], 5),
        new Trial("ABC3", "GlaxoSmithKline", "GlaxoSmithKline Trial", ['BGR001', 'BGR002'], 8),
        new Trial("ABC4", "Astra Zeneka", "Astra Zeneka Trial", ['BGR001', 'BGR002'], 6),
        new Trial("ABC5", "Actavis", "Actavis Trial", ['BGR001', 'BGR002'], 3)
    ];

    public archivedTrials: Trial[] = [
        new Trial('QWE1', 'Tchaikapharma', 'Old and forgotten trial', ['BGR001'], 7),
        new Trial('QWE2', 'Made-Up Pharmaceutical', 'Another old trial', ['BGR001', 'BGR002'], 5)
    ];

    constructor(private http: HttpClient) { }

    getMyTrials (): Observable<Trial[]> {
        return Observable.of(this.trials);
    }

    getActiveTrials (): Observable<Trial[]> {
        return this.http.get<Array<Trial>>('/api/trials');
    }

    getArchivedTrials (): Observable<Trial[]> {
        return Observable.of(this.archivedTrials);
    }

    addTrial (trial: Trial): Observable<Trial> {
        return this.http.post<Trial>('/api/trials/', trial)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateTrial (trial: Trial): Observable<Trial> {
        return this.http.put<Trial>('/api/trials/' + trial.id, trial)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    removeTrial (id: string): Observable<Trial> {
        return this.http.delete<Trial>('/api/trials/' + id)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
