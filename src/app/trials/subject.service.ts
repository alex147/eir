import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from './subject';

@Injectable()
export class SubjectService {

    public subjects: { [key: string]: Subject[]; } = {
        'BGR001': [
            new Subject("BGR001-001", new Date(), 'Male', true, 'Declared', new Date()),
            new Subject("BGR001-002", new Date(), 'Female', false, 'Withdrawn', new Date()),
            new Subject("BGR001-003", new Date(), 'Female', true, 'Declared', new Date())
        ],
        'BGR002': [
            new Subject("BGR002-001", new Date(), 'Female', true, 'Declared', new Date()),
            new Subject("BGR002-002", new Date(), 'Male', false, 'Withdrawn', new Date()),
            new Subject("BGR002-003", new Date(), 'Female', false, 'Deceased', new Date())
        ]
    };

    constructor() { }

    getSubjectsByTrialIdAndCenterId (trialId: string, centerId: string): Observable<Subject[]> {
        return Observable.of(this.subjects[centerId]);
    }

}
