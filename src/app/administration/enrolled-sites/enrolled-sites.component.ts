import { Component, OnInit } from '@angular/core';
import { Site } from '../../trials/site';
import { SiteService } from '../../trials/site.service';

@Component({
    selector: 'admin-enrolled-sites',
    templateUrl: './enrolled-sites.component.html',
    styleUrls: ['./enrolled-sites.component.scss']
})
export class EnrolledSitesComponent implements OnInit {

    public sites: Site[];
    public isModalOpen: boolean;

    constructor(private siteService: SiteService) { }

    ngOnInit () {
        this.siteService.getAllSites()
            .subscribe(data => this.sites = data);
    }

    onAdd () {

    }

    onEdit (site: Site) {
        this.isModalOpen = true;
    }

    onDelete (site: Site) {
        this.sites = this.sites.filter((toCompare: Site) => {
            return site.id !== toCompare.id;
        });
    }

    onModalSubmitted () {
        this.isModalOpen = false;
    }

}
