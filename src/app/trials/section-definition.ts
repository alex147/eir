import { MetricDefinition } from './metric-definition';

export class SectionDefinition {
    constructor(public id: string,
        public name: string,
        public description: string,
        public metricDefinitions: MetricDefinition[] = []) { }
}
