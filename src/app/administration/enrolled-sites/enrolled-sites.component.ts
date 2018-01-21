import { Component, OnInit } from '@angular/core';
import { Site } from '../../trials/site';
import { SiteService } from '../../trials/site.service';

@Component({
    selector: 'admin-enrolled-sites',
    templateUrl: './enrolled-sites.component.html',
    styleUrls: ['./enrolled-sites.component.scss']
})
export class EnrolledSitesComponent implements OnInit {

    public sites: Site[] = [];
    public selectedSite: Site;
    public isAddModalOpen: boolean;
    public isUpdateModalOpen: boolean;
    public isDeleteModalOpen: boolean;

    constructor(private siteService: SiteService) { }

    ngOnInit () {
        this.selectedSite = new Site("", "", "", "", "");
        this.siteService.getAllSites()
            .subscribe(data => this.sites = data);
    }

    onAdd () {
        this.selectedSite = new Site("", "", "", "", "");
        this.isAddModalOpen = true;
    }

    onAddModalSubmitted () {
        if (this.sites.indexOf(this.selectedSite) !== -1) {
            this.siteService.updateSite(this.selectedSite)
                .subscribe(data => console.log(data));
        } else {
            this.siteService.addSite(this.selectedSite)
                .subscribe(data => console.log(data));
        }
        this.onAddModalDismissed();
    }

    onAddModalDismissed () {
        this.siteService.getAllSites()
            .subscribe(data => {
                this.sites = data;
                this.isAddModalOpen = false;
            });
    }

    onEdit (site: Site) {
        this.selectedSite = site;
        this.isAddModalOpen = true;
    }

    onDelete (site: Site) {
        this.isDeleteModalOpen = true;
        this.selectedSite = site;
    }

    onDeleteModalSubmitted () {
        this.siteService.removeSite(this.selectedSite.id)
            .subscribe(data => console.log("Deleted site", data));
        this.onDeleteModalDismissed();
    }

    onDeleteModalDismissed () {
        this.siteService.getAllSites()
            .subscribe(data => {
                this.sites = data;
                this.isDeleteModalOpen = false;
            });
    }
}
