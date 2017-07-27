import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitDefinitionsService } from '../visit-definitions.service';
import { SectionDefinition } from '../section-definition';
import { Question } from '../question';

@Component({
    selector: 'section-form',
    templateUrl: './section-form.component.html',
    styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

    public section: SectionDefinition;
    public form: FormGroup;

    constructor(private route: ActivatedRoute,
        private visitDefinitionsService: VisitDefinitionsService) { }

    ngOnInit () {
        let trialId: string = this.route.snapshot.parent.params['id'];
        let visitId: number = this.route.snapshot.queryParams['visit'];
        let sectionId: string = this.route.snapshot.queryParams['section'];

        this.visitDefinitionsService.getSection(trialId, visitId, sectionId)
            .subscribe((data) => {
                this.section = data;
                this.form = this.createFormGroup(this.section.questions);
            });
    }

    createFormGroup (questions: Question[]) {
        let group: any = {};

        questions.forEach(question => {
            group[question.id] = question.isRequired ? new FormControl(question.defaultValue || '', Validators.required)
                : new FormControl(question.defaultValue || '');
        });
        return new FormGroup(group);
    }

    onSubmit () {
        // 1. Persist new section state
        // 2. Navigate back to previous view.
        // JSON.stringify(this.form.value);
    }

}
