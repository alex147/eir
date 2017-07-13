import { Component, OnInit, HostBinding } from '@angular/core';
import { Trial } from '../../common/model/trial';

@Component({
    selector: 'app-admin-archived-trials',
    templateUrl: './admin-archived-trials.component.html',
    styleUrls: ['./admin-archived-trials.component.scss']
})
export class AdminArchivedTrialsComponent implements OnInit {

    @HostBinding('class') classes = 'content-area';

    public trials: Trial[] = [
        new Trial('1', 'Tchaikapharma', 'Old and forgotten trial', ['BGR001']),
        new Trial('2', 'Made-Up Pharmaceutical', 'Another old trial', ['BGR001', 'BGR002'])
    ];
    constructor() { }

    ngOnInit () {
    }

}
