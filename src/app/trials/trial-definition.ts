import { VisitDefinition } from './visit-definition';

export class TrialDefinition {
    constructor(public id: string,
        public visitDefinitions: VisitDefinition[] = []) { }
}
