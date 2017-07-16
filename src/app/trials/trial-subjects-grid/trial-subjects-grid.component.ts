import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { Gender } from '../gender';

@Component({
    selector: 'trial-subjects-grid',
    templateUrl: './trial-subjects-grid.component.html',
    styleUrls: ['./trial-subjects-grid.component.scss']
})
export class TrialSubjectsGridComponent implements OnInit {

    @HostBinding('class') classes = 'content-area';

    public subjects: Subject[];
    public gender: any = Gender;
    public isModalOpen: boolean;

    constructor(private route: ActivatedRoute,
                private subjectService: SubjectService) { }

    ngOnInit () {
        this.route.params.forEach((params: Params) => {
            let centerId = params['center'];
            let trialId = this.route.snapshot.parent.parent.paramMap.get('id');

            this.subjectService
                .getSubjectsByTrialIdAndCenterId(trialId, centerId)
                    .subscribe(data => this.subjects = data);
        });
    }

    onAdd () {

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
