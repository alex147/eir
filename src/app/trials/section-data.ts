import { SectionStatus } from './section-status';

export class SectionData {
    constructor(public sectionId: string,
        public name: string,
        public status: SectionStatus = SectionStatus.NotStarted,
        public metricData: any[]) { }
}
