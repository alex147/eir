import { VisitDefinition } from './visit-definition';

export class TrialVisitDefinitions {
    constructor(public trialId: string,
        public visitDefinitions: VisitDefinition[] = []) { }
}
