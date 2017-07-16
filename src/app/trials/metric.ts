import { MetricType } from './metric-type';

export class Metric {
    constructor(public name: string,
        public type: MetricType,
        public notes: string = "No notes.") { }
}
