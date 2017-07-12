import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from '../../common/model/subject';

@Component({
    selector: 'trial-subjects-grid',
    templateUrl: './trial-subjects-grid.component.html',
    styleUrls: ['./trial-subjects-grid.component.scss'],
    host: { class: 'content-area' }
})
export class TrialSubjectsGridComponent implements OnInit {

    public subjects: Subject[] = [
        new Subject("BGR001-001", new Date(), 'Male', true, 'Declared', new Date()),
        new Subject("BGR001-002", new Date(), 'Female', false, 'Withdrawn', new Date()),
        new Subject("BGR001-003", new Date(), 'Female', true, 'Declared', new Date())
    ];

    // public subjects: { [key:string]: Subject[]; } = {
    //     'BGR001': [
    //         new Subject("BGR001-001", new Date(), Gender.Male, true, 'Declared', new Date()),
    //         new Subject("BGR001-002", new Date(), Gender.Female, false, 'Withdrawn', new Date()),
    //         new Subject("BGR001-003", new Date(), Gender.Female, true, 'Declared', new Date())
    //     ],
    //     'BGR002': [
    //         new Subject("BGR002-001", new Date(), Gender.Female, true, 'Declared', new Date()),
    //         new Subject("BGR002-002", new Date(), Gender.Male, false, 'Withdrawn', new Date()),
    //         new Subject("BGR002-003", new Date(), Gender.Female, false, 'Deceased', new Date())
    //     ]
    // };

    private centerId: string;
    public isModalOpen: boolean;

    constructor(private route: ActivatedRoute) { }

    ngOnInit () {
        this.route.params.forEach((params: Params) => {
            this.centerId = params['center'];
        });
    }

    onEdit (subject: Subject) {
        this.isModalOpen = true;
    }

    onDelete (subject: Subject) {
        this.subjects = this.subjects.filter((toCompare: Subject) => {
            return subject.id !== toCompare.id;
        });
    }

    onModalSubmitted () {
        this.isModalOpen = false;
    }

}
