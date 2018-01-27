import { Gender } from './gender';
import { SubjectStatus } from './subject-status';

export class Subject {
    constructor(public id: string,
        public consentDate: Date,
        public gender: Gender,
        public isActive: boolean,
        public status: SubjectStatus,
        public statusDate: Date,
        public trialId: string,
        public siteId: string,
        public completedVisits: number = 0) { }
}
