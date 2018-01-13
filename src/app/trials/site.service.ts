import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Site } from './site';

@Injectable()
export class SiteService {

    public sites: Site[] = [
        new Site('BGR001', 'Kaspela', 'BGR', "Ivan Ivanov", "+359 888 123456"),
        new Site('BGR002', 'Sofia Med', 'BGR', "Petar Georgiev", "+359 888 987654")
    ];

    constructor() { }

    getSitesByTrialId (trialId: string): Observable<Site[]> {
        return Observable.of(this.sites);
    }

    getAllSites (): Observable<Site[]> {
        return Observable.of(this.sites);
    }

}
