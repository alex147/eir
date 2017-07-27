import { SectionDefinition } from './section-definition';

export class VisitDefinition {
    constructor(public description: string,
        public sections: SectionDefinition[] = []) { }
}
