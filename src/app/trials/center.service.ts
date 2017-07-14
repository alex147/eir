import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Center } from './center';

@Injectable()
export class CenterService {

    public centers: Center[] = [
        new Center('BGR001', 'BGR001', 'BGR'),
        new Center('BGR002', 'BGR002', 'BGR')
    ];

    constructor() { }

    getCentersByTrialId (trialId: string): Observable<Center[]> {
        return Observable.of(this.centers);
    }

}
