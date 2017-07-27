import { QuestionType } from './question-type';

export class Question {
    constructor(public id: string,
        public label: string,
        public type: QuestionType,
        public order: number,
        public isRequired: boolean = false,
        public notes?: string,
        public defaultValue?: string,
        public options?: { key: string, value: string }[]) { }
}
