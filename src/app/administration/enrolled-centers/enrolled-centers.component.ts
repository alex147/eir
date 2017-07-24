import { Component, OnInit } from '@angular/core';
import { Center } from '../../trials/center';
import { CenterService } from '../../trials/center.service';

@Component({
    selector: 'admin-enrolled-centers',
    templateUrl: './enrolled-centers.component.html',
    styleUrls: ['./enrolled-centers.component.scss']
})
export class EnrolledCentersComponent implements OnInit {

    public centers: Center[];
    public isModalOpen: boolean;

    constructor(private centerService: CenterService) { }

    ngOnInit () {
        this.centerService.getAllCenters()
            .subscribe(data => this.centers = data);
    }

    onAdd () {

    }

    onEdit (user: Center) {
        this.isModalOpen = true;
    }

    onDelete (center: Center) {
        this.centers = this.centers.filter((toCompare: Center) => {
            return center.id !== toCompare.id;
        });
    }

    onModalSubmitted () {
        this.isModalOpen = false;
    }

}
