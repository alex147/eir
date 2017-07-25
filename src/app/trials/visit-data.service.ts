import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { VisitData } from './visit-data';
import { VisitInstance } from './visit-instance';
import { SectionData } from './section-data';
import { SectionStatus } from './section-status';

@Injectable()
export class VisitDataService {

    private sectionData: SectionData[] = [
        new SectionData("Vital Signs", SectionStatus.Completed, []),
        new SectionData("Habits Information", SectionStatus.InProgress, []),
        new SectionData("Demographic Information", SectionStatus.NotStarted, [])
    ];

    private visits: VisitInstance[] = [
        new VisitInstance(1, this.sectionData),
        new VisitInstance(2, this.sectionData)
    ];

    private data: VisitData[] = [
        new VisitData("BGR001-001", this.visits),
        new VisitData("BGR001-002", this.visits),
        new VisitData("BGR001-003", this.visits),
        new VisitData("BGR002-001", this.visits),
        new VisitData("BGR002-002", this.visits),
        new VisitData("BGR002-003", this.visits)
    ];

    constructor() { }

    getVisitDataByCenterId (centerId: string): Observable<VisitData[]> {
        // SELECT * FROM visitdata WHERE ID LIKE $centerid%
        return Observable.of(this.data
            .filter(data => data.subjectId.indexOf(centerId) >= 0 ));
    }
}
