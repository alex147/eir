import { Component, OnInit } from '@angular/core';
import { Center } from '../../common/model/center';

@Component({
    selector: '[trial-centers]',
    templateUrl: './trial-centers.component.html',
    styleUrls: ['./trial-centers.component.scss']
})
export class TrialCentersComponent implements OnInit {

    public centers: Center[] = [
        new Center('BGR001', 'BGR001', 'BGR'),
        new Center('BGR002', 'BGR002', 'BGR')
    ];

    constructor() { }

    ngOnInit () {
    }

}
