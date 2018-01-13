import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../site';
import { SiteService } from '../site.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { Gender } from '../gender';
import { VisitDefinitionsService } from '../visit-definitions.service';

@Component({
    selector: 'trial-subjects',
    templateUrl: './trial-subjects.component.html',
    styleUrls: ['./trial-subjects.component.scss']
})
export class TrialSubjectsComponent implements OnInit {

    public trialId: string;
    public siteId: string = "";
    public sites: Site[];
    public subjects: Subject[];
    public gender: any = Gender;
    public trialNumOfVisits: number = 0;
    public isModalOpen: boolean;

    constructor(private route: ActivatedRoute,
        private siteService: SiteService,
        private subjectService: SubjectService,
        private visitDefinitionsService: VisitDefinitionsService) {
    }

    ngOnInit () {
        this.trialId = this.route.snapshot.parent.params["id"];
        this.siteService.getSitesByTrialId(this.trialId)
            .subscribe((data) => {
                this.sites = data;
                this.siteId = this.sites[0].id;
                this.fetchSubjects();
            });
        this.visitDefinitionsService.getNumOfVisitsByTrialId(this.trialId)
            .subscribe((data) => {
                this.trialNumOfVisits = data;
            });
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
