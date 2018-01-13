import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from './subject';
import { Gender } from './gender';

@Injectable()
export class SubjectService {

    public subjects: { [key: string]: Subject[]; } = {
        'BGR001': [
            new Subject("BGR001-001", new Date(), Gender.Male, true, 'Declared', new Date()),
            new Subject("BGR001-002", new Date(), Gender.Female, false, 'Withdrawn', new Date()),
            new Subject("BGR001-003", new Date(), Gender.Female, true, 'Declared', new Date())
        ],
        'BGR002': [
            new Subject("BGR002-001", new Date(), Gender.Female, true, 'Declared', new Date()),
            new Subject("BGR002-002", new Date(), Gender.Male, false, 'Withdrawn', new Date()),
            new Subject("BGR002-003", new Date(), Gender.Female, false, 'Deceased', new Date())
        ]
    };

    constructor() { }

    getSubjectsByTrialIdAndSiteId (trialId: string, siteId: string): Observable<Subject[]> {
        return Observable.of(this.subjects[siteId]);
    }

}
