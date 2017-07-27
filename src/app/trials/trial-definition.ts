import { VisitDefinition } from './visit-definition';

export class TrialDefinition {
    constructor(public trialId: string,
        public visitDefinitions: VisitDefinition[] = []) { }
}
