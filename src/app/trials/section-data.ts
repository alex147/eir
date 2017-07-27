import { SectionStatus } from './section-status';

export class SectionData {
    constructor(public id: string,
        public name: string,
        public status: SectionStatus = SectionStatus.NotStarted,
        public metricData: any[]) { }
}
