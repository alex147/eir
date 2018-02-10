import { VisitInstance } from './visit-instance';

export class VisitData {
    constructor(public trialId: string,
        public subjectId: string,
        public visits: VisitInstance[]) {
    }
}
