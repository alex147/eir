import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../center';
import { CenterService } from '../center.service';
import { VisitData } from '../visit-data';
import { VisitDataService } from '../visit-data.service';

@Component({
    selector: 'trial-visits',
    templateUrl: './trial-visits.component.html',
    styleUrls: ['./trial-visits.component.scss']
})
export class TrialVisitsComponent implements OnInit {

    public trialId: string;
    public selectedCenterId: string = "";
    public selectedSubjectEntry: VisitData;
    public centers: Center[];
    public visitData: VisitData[];

    constructor(private route: ActivatedRoute,
        private centerService: CenterService,
        private visitDataService: VisitDataService) { }

    ngOnInit () {
        this.trialId = this.route.snapshot.queryParamMap.get("id");
        this.centerService.getCentersByTrialId(this.trialId)
            .subscribe((data) => {
                this.centers = data;
                this.selectedCenterId = this.centers[0].id;
                this.fetchVisitData();
            });
    }

    fetchVisitData () {
        this.visitDataService
            .getVisitDataByCenterId(this.selectedCenterId)
            .subscribe((data) => {
                this.visitData = data;
                this.selectedSubjectEntry = this.visitData[0];
            });
    }

}
