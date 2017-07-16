import { Gender } from './gender';

export class Subject {
    constructor(public id: string,
        public consentDate: Date,
        public gender: Gender,
        public isActive: boolean,
        public status: string,
        public statusDate: Date) { }
}
