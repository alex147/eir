import { MetricSection } from './metric-section';

export class VisitDefinition {
    constructor(public description: string,
        public sections: MetricSection[] = []) { }
}
