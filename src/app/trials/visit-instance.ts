import { SectionData } from './section-data';

export class VisitInstance {
    constructor(public id: number,
        public capturedData: SectionData[],
        public description: string = "") { }
}
