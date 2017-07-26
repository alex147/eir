import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../center';
import { CenterService } from '../center.service';
import { VisitData } from '../visit-data';
import { VisitDataService } from '../visit-data.service';
import { SectionStatus } from '../section-status';

@Component({
    selector: 'trial-visits',
    templateUrl: './trial-visits.component.html',
    styleUrls: ['./trial-visits.component.scss']
})
export class TrialVisitsComponent implements OnInit {

    private trialId: string;
    public selectedCenterId: string = "";
    public selectedSubjectEntry: VisitData;
    public centers: Center[];
    public visitData: VisitData[];

    constructor(private route: ActivatedRoute,
        private centerService: CenterService,
        private visitDataService: VisitDataService) { }

    ngOnInit () {
        this.trialId = this.route.snapshot.parent.params["id"];
        let subjectIdQueryParam: string = this.route.snapshot.queryParams['id']
            || "";
        this.centerService.getCentersByTrialId(this.trialId)
            .subscribe((data) => {
                this.centers = data;
                this.selectedCenterId =
                    this.extractCenterIdFromSubjectId(subjectIdQueryParam);
                this.fetchVisitData();
                this.selectedSubjectEntry =
                    this.findSubjectWithId(subjectIdQueryParam);
            });
    }

    fetchVisitData () {
        this.visitDataService
            .getVisitDataByCenterId(this.selectedCenterId)
            .subscribe((data) => {
                this.visitData = data;
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

    extractCenterIdFromSubjectId (subjectId: string): string {
        let hyphenIdx = subjectId.lastIndexOf("-");
        if (hyphenIdx > 0) {
            let centerId = subjectId.substring(0, hyphenIdx);
            let matching: Array<Center> = this.centers
                .filter(entry => entry.id === centerId);
            if (matching.length) {
                return matching[0].id;
            }
        }

        return this.centers[0].id;
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

}
