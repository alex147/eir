import { VisitInstance } from './visit-instance';

export class VisitData {
    constructor(public subjectId: string,
        public visits: VisitInstance[]) {
    }
}
