export class Subject {
    constructor(public id: string,
        public consentDate: Date,
        public gender: string,
        public isActive: boolean,
        public status: string,
        public statusDate: Date) { }
}
