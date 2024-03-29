import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../question';

@Component({
    selector: 'df-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {

    @Input() question: Question;
    @Input() form: FormGroup;
    @Input() value: any;
    public openState: boolean = false;

    constructor() { }

    ngOnInit () { }

    isValid () {
        return this.form.controls[this.question.id].valid;
    }

}
