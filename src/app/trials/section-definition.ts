import { Question } from './question';

export class SectionDefinition {
    constructor(public id: string,
        public name: string,
        public description: string,
        public questions: Question[] = []) { }
}
