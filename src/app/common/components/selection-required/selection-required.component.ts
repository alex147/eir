import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-selection-required',
    templateUrl: './selection-required.component.html',
    styleUrls: ['./selection-required.component.scss']
})
export class SelectionRequiredComponent implements OnInit {

    @HostBinding('class') classes = 'content-area';

    public requireSelectionName: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit () {
        this.route.data
            .subscribe((data: { required: string }) => {
                this.requireSelectionName = data.required;
            });
    }

}
