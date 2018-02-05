import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrialService } from '../trial.service';
import { VisitData } from '../visit-data';
import { VisitDataService } from '../visit-data.service';
import { VisitInstance } from '../visit-instance';
import { SectionStatus } from '../section-status';

@Component({
    selector: 'trial-visits',
    templateUrl: './trial-visits.component.html',
    styleUrls: ['./trial-visits.component.scss']
})
export class TrialVisitsComponent implements OnInit {

    private trialId: string;
    private subjectId: string;
    public selectedSiteId: string = "";
    public selectedSubjectEntry: VisitData;
    public sites: string[];
    public visitData: VisitData[];

    constructor(private route: ActivatedRoute,
        private trialService: TrialService,
        private visitDataService: VisitDataService) { }

    ngOnInit () {
        this.trialId = this.route.snapshot.parent.params["id"];
        this.subjectId = this.route.snapshot.queryParams['id']
            || "";
        this.trialService.getTrial(this.trialId)
            .subscribe((data) => {
                this.sites = data.sites;
                this.selectedSiteId =
                    this.extractSiteIdFromSubjectId(this.subjectId);
                this.fetchVisitData();
            });
    }

    fetchVisitData () {
        this.visitDataService
            .getVisitDataBySiteId(this.selectedSiteId)
            .subscribe((data) => {
                this.visitData = data;
                this.selectedSubjectEntry =
                    this.findSubjectWithId(this.subjectId);
            });
    }

    getSectionIconClass (status: SectionStatus): string {
        switch (status) {
            case SectionStatus.NotStarted:
                return "is-error";
            case SectionStatus.InProgress:
                return "is-warning";
            case SectionStatus.Completed:
                return "is-success";
            default:
                return "";
        }
    }

    getVisitBadgeClass (numOfCompletedSections: number,
        totalNumOfSections: number): string {
        if (numOfCompletedSections === 0) {
            return "badge-danger";
        }
        if (numOfCompletedSections === totalNumOfSections) {
            return "badge-success";
        }
        return "badge-warning";
    }

    extractSiteIdFromSubjectId (subjectId: string): string {
        let hyphenIdx = subjectId.lastIndexOf("-");
        if (hyphenIdx > 0) {
            let siteId = subjectId.substring(0, hyphenIdx);
            let idx: number = this.sites.indexOf(siteId);
            if (idx !== -1) {
                return this.sites[idx];
            }
        }

        return this.sites[0];
    }

    findSubjectWithId (subjectId: string): VisitData {
        if (!subjectId) {
            return this.visitData[0];
        }
        let matching: Array<VisitData> = this.visitData
            .filter(entry => entry.subjectId === subjectId);
        if (matching.length) {
            return matching[0];
        } else {
            return this.visitData[0];
        }
    }

    getTotalSectionCount (instance: VisitInstance): number {
        return instance.capturedData.length;
    }

    getCompletedSectionCount (instance: VisitInstance): number {
        let completedCount: number = 0;
        for (let section of instance.capturedData) {
            if (section.status === SectionStatus.Completed) {
                completedCount++;
            }
        }

        return completedCount;
    }

}
