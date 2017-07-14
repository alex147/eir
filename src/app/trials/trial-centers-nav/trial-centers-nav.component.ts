import { Component, OnInit, Input } from '@angular/core';
import { Center } from '../center';
import { CenterService } from '../center.service';

@Component({
    selector: '[trial-centers-nav]',
    templateUrl: './trial-centers-nav.component.html',
    styleUrls: ['./trial-centers-nav.component.scss']
})
export class TrialCentersNavComponent implements OnInit {

    @Input() trialId: string;
    public filterString: string;

    public centers: Center[];

    constructor(private centerService: CenterService) { }

    ngOnInit () {
        this.centerService.getCentersByTrialId(this.trialId)
            .subscribe(data => this.centers = data);
    }

    clearFilter () {
        this.filterString = '';
    }

}
