import { Component, OnInit } from '@angular/core';
import { Question } from './../../trials/question';
import { QuestionType } from './../../trials/question-type';
import { SectionDefinition } from './../../trials/section-definition';

@Component({
    selector: 'section-questions',
    templateUrl: './section-questions.component.html',
    styleUrls: ['./section-questions.component.scss']
})
export class SectionQuestionsComponent implements OnInit {

    public qType: any = QuestionType;
    public types: any[] = [];
    private questions: Question[] = [
        new Question("weight", "Weight", QuestionType.PDecimal, true, "Measured on an empty stomach."),
        new Question("height", "Height", QuestionType.PDecimal, true, "Measured with the shoes taken off."),
        new Question("age", "Age", QuestionType.PNumber, true, "Age at start of trial.")
    ];
    public section: SectionDefinition = new SectionDefinition("vitals",
        "Vital Signs",
        `This section aims at capturing the Vital Signs for the subject in question.`,
        this.questions);


    constructor() { }

    ngOnInit () {
        this.types = Object.keys(QuestionType)
            .filter((v: any) => !/\d/.test(v));
    }

}
