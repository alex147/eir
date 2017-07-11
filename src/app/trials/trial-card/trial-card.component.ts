import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'trial-card',
    templateUrl: './trial-card.component.html',
    styleUrls: ['./trial-card.component.scss']
})
export class TrialCardComponent implements OnInit {

    @Input() trial;

    constructor() { }

    ngOnInit () {
    }

}
