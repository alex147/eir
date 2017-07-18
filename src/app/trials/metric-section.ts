import { Metric } from './metric';

export class MetricSection {
    constructor(public name: string,
        public description: string,
        public metricDefinitions: Metric[] = []) { }
}
