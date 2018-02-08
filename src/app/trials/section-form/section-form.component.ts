import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitDefinitionsService } from '../visit-definitions.service';
import { VisitDataService } from '../visit-data.service';
import { SectionDefinition } from '../section-definition';
import { SectionData } from '../section-data';
import { SectionStatus } from '../section-status';
import { Question } from '../question';

@Component({
    selector: 'section-form',
    templateUrl: './section-form.component.html',
    styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

    public section: SectionDefinition;
    public sectionData: SectionData;
    public form: FormGroup;
    public trialId: string;
    public visitId: number;
    public sectionId: string;
    public subjectId: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private visitDefinitionsService: VisitDefinitionsService,
        private visitDataService: VisitDataService) { }

    ngOnInit () {
        this.trialId = this.route.snapshot.parent.params['id'];
        this.visitId = this.route.snapshot.queryParams['visit'];
        this.sectionId = this.route.snapshot.queryParams['section'];
        this.subjectId = this.route.snapshot.queryParams['subject'];

        this.visitDefinitionsService.getSection(this.trialId, this.visitId, this.sectionId)
            .subscribe((data) => {
                this.section = data;
                this.form = this.createFormGroup(this.section.questions);
            });

        this.visitDataService.getSectionData(this.subjectId, this.visitId, this.sectionId)
            .subscribe((data) => {
                if (!data) {
                    this.sectionData = new SectionData(this.section.id, this.section.name, SectionStatus.InProgress, {});
                } else {
                    this.sectionData = data;
                }
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

    onFormSubmitted () {
        this.sectionData.metricData = this.form.value;
        this.sectionData.status = SectionStatus.Completed;
        this.visitDataService.saveSectionData(this.subjectId, this.visitId, this.sectionId, this.sectionData)
            .subscribe((data) => {

            });
        this.router.navigate(
            ['/trials/' + this.trialId + '/visits'],
            { queryParams: { id: this.subjectId } });
    }

    onFormDismissed () {
        this.router.navigate(
            ['/trials/' + this.trialId + '/visits'],
            { queryParams: { id: this.subjectId } });
    }

}
