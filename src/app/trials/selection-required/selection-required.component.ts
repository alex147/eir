import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'selection-required',
    templateUrl: './selection-required.component.html',
    styleUrls: ['./selection-required.component.scss']
})
export class SelectionRequiredComponent implements OnInit {

    public requireSelectionName: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit () {
        this.route.data
            .subscribe((data: { required: string }) => {
                this.requireSelectionName = data.required;
            });
    }

}
