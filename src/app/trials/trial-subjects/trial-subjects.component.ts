import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrialService } from '../trial.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { Gender } from '../gender';
import { SubjectStatus } from '../subject-status';
import { VisitDefinitionsService } from '../visit-definitions.service';

@Component({
    selector: 'trial-subjects',
    templateUrl: './trial-subjects.component.html',
    styleUrls: ['./trial-subjects.component.scss']
})
export class TrialSubjectsComponent implements OnInit {

    public trialId: string;
    public siteId: string = "";
    public sites: string[];
    public subjects: Subject[];
    public genders: any[] = [];
    public statuses: any[] = [];
    public selectedSubject: Subject;
    public trialNumOfVisits: number = 0;
    public isAddModalOpen: boolean;
    public isUpdateModalOpen: boolean;
    public isDeleteModalOpen: boolean;

    constructor(private route: ActivatedRoute,
        private trialService: TrialService,
        private subjectService: SubjectService,
        private visitDefinitionsService: VisitDefinitionsService) {
    }

    ngOnInit () {
        this.genders = Object.keys(Gender)
            .filter((v: any) => !/\d/.test(v));
        this.statuses = Object.keys(SubjectStatus)
            .filter((v: any) => !/\d/.test(v));
        this.trialId = this.route.snapshot.parent.params["id"];
        this.trialService.getSitesByTrialId(this.trialId)
            .subscribe((data) => {
                this.sites = data;
                this.siteId = this.sites[0];
                this.fetchSubjects();
            });
        this.visitDefinitionsService.getNumOfVisitsByTrialId(this.trialId)
            .subscribe((data) => {
                this.trialNumOfVisits = data;
            });
        this.selectedSubject = new Subject("", new Date(),
            Gender.Female, true, SubjectStatus.Declared,
            new Date(), this.trialId, this.siteId);
    }

    fetchSubjects () {
        this.subjectService
            .getSubjectsByTrialIdAndSiteId(this.trialId, this.siteId)
            .subscribe(data => this.subjects = data);
    }

    getVisitBadgeClass (numOfCompletedVisits: number,
        totalNumOfVisits: number): string {
        if (numOfCompletedVisits === 0) {
            return "badge-danger";
        }
        if (numOfCompletedVisits === totalNumOfVisits) {
            return "badge-success";
        }
        return "badge-warning";
    }

    onAdd () {
        this.selectedSubject = new Subject("", new Date(),
            Gender.Female, true, SubjectStatus.Declared,
            new Date(), this.trialId, this.siteId);
        this.isAddModalOpen = true;
    }

    onAddModalSubmitted () {
        if (this.subjects.indexOf(this.selectedSubject) !== -1) {
            this.subjectService.updateSubject(this.selectedSubject)
                .subscribe(data => console.log(data));
        } else {
            this.subjectService.addSubject(this.selectedSubject)
                .subscribe(data => console.log(data));
        }
        this.onAddModalDismissed();
    }

    onAddModalDismissed () {
        this.subjectService.getSubjectsByTrialIdAndSiteId(this.trialId, this.siteId)
            .subscribe(data => {
                this.subjects = data;
                this.isAddModalOpen = false;
            });
    }

    onEdit (subject: Subject) {
        this.selectedSubject = subject;
        this.isAddModalOpen = true;
    }

    onDelete (subject: Subject) {
        this.isDeleteModalOpen = true;
        this.selectedSubject = subject;
    }

    onDeleteModalSubmitted () {
        this.subjectService.removeSubject(this.selectedSubject.id)
            .subscribe(data => console.log("Deleted subject", data));
        this.onDeleteModalDismissed();
    }

    onDeleteModalDismissed () {
        this.subjectService.getSubjectsByTrialIdAndSiteId(this.trialId, this.siteId)
            .subscribe(data => {
                this.subjects = data;
                this.isDeleteModalOpen = false;
            });
    }
}
