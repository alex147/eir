import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from './../../trials/question';
import { QuestionType } from './../../trials/question-type';
import { SectionDefinition } from './../../trials/section-definition';
import { VisitDefinitionsService } from '../../trials/visit-definitions.service';

@Component({
    selector: 'section-questions',
    templateUrl: './section-questions.component.html',
    styleUrls: ['./section-questions.component.scss']
})
export class SectionQuestionsComponent implements OnInit {

    public qType: any = QuestionType;
    public types: any[] = [];
    public trialId: string;
    public visitId: number;
    public sectionId: string;

    private questions: Question[] = [
        new Question("weight", "Weight", QuestionType.PDecimal, true, "Measured on an empty stomach."),
        new Question("height", "Height", QuestionType.PDecimal, true, "Measured with the shoes taken off."),
        new Question("age", "Age", QuestionType.PNumber, true, "Age at start of trial.")
    ];
    public section: SectionDefinition = new SectionDefinition("vitals",
        "Vital Signs",
        `This section aims at capturing the Vital Signs for the subject in question.`,
        this.questions);

    constructor(private route: ActivatedRoute,
        private router: Router,
        private visitDefinitionsService: VisitDefinitionsService) { }

    ngOnInit () {
        this.types = Object.keys(QuestionType)
            .filter((v: any) => !/\d/.test(v));

        this.trialId = this.route.snapshot.queryParams['trialId'];
        this.visitId = this.route.snapshot.queryParams['visitId'];
        this.sectionId = this.route.snapshot.queryParams['sectionId'];
    }

    onFormSubmitted () {
        if (this.sectionId) {
            this.visitDefinitionsService.updateSection(this.section, this.trialId, this.visitId)
                .subscribe(data => console.log(data));
        } else {
            this.visitDefinitionsService.addSection(this.section, this.trialId, this.visitId)
                .subscribe(data => console.log(data));
        }
        this.router.navigate(['/admin/visits']);
    }

    onFormDismissed () {
        this.router.navigate(['/admin/visits']);
    }

}
