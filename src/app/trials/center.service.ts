import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Center } from './center';

@Injectable()
export class CenterService {

    public centers: Center[] = [
        new Center('BGR001', 'BGR001', 'BGR', "Ivan Ivanov", "+359 888 123456"),
        new Center('BGR002', 'BGR002', 'BGR', "Petar Georgiev", "+359 888 987654")
    ];

    constructor() { }

    getCentersByTrialId (trialId: string): Observable<Center[]> {
        return Observable.of(this.centers);
    }

    getAllCenters (): Observable<Center[]> {
        return Observable.of(this.centers);
    }

}
