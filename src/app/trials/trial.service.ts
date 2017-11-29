import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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

    constructor() { }

    getMyTrials (): Observable<Trial[]> {
        return Observable.of(this.trials);
    }

    getActiveTrials (): Observable<Trial[]> {
        return Observable.of(this.trials);
    }

    getArchivedTrials (): Observable<Trial[]> {
        return Observable.of(this.archivedTrials);
    }

}
