import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../center';
import { CenterService } from '../center.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { Gender } from '../gender';

@Component({
    selector: 'trial-subjects',
    templateUrl: './trial-subjects.component.html',
    styleUrls: ['./trial-subjects.component.scss']
})
export class TrialSubjectsComponent implements OnInit {

    public trialId: string;
    public centerId: string = "";
    public centers: Center[];
    public subjects: Subject[];
    public gender: any = Gender;
    public isModalOpen: boolean;


    constructor(private route: ActivatedRoute,
        private centerService: CenterService,
        private subjectService: SubjectService) {
    }

    ngOnInit () {
        this.trialId = this.route.snapshot.queryParamMap.get("id");
        this.centerService.getCentersByTrialId(this.trialId)
            .subscribe((data) => {
                this.centers = data;
                this.centerId = this.centers[0].id;
                this.fetchSubjects();
            });
    }

    fetchSubjects () {
        this.subjectService
            .getSubjectsByTrialIdAndCenterId(this.trialId, this.centerId)
            .subscribe(data => this.subjects = data);
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
