import { SectionData } from './section-data';
import { SectionStatus } from './section-status';

export class VisitInstance {
    constructor(public id: number,
        public capturedData: SectionData[],
        public description: string = "") { }

    getTotalSectionCount (): number {
        return this.capturedData.length;
    }

    getCompletedSectionCount (): number {
        let completedCount: number = 0;
        for (let section of this.capturedData) {
            if (section.status === SectionStatus.Completed) {
                completedCount++;
            }
        }

        return completedCount;
    }
}
