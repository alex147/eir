import { Metric } from './metric';

export class VisitDefinition {
    constructor(public description: string,
        public metricDefinitions: Metric[] = []) { }
}
