import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Center } from '../center';
import { CenterService } from '../center.service';

@Component({
    selector: '[trial-centers-nav]',
    templateUrl: './trial-centers-nav.component.html',
    styleUrls: ['./trial-centers-nav.component.scss']
})
export class TrialCentersNavComponent implements OnInit {

    @Input() trialId: string;

    public centers: Center[];

    constructor(private centerService: CenterService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit () {
        this.centerService.getCentersByTrialId(this.trialId)
            .subscribe((data) => {
                this.centers = data;
                this.router.navigate(['./', this.centers[0].id],
                    { relativeTo: this.route }
                );
            });
    }

}
