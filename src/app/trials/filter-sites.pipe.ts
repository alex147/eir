import { Pipe, PipeTransform } from '@angular/core';
import { Site } from './site';

@Pipe({ name: 'filterSites' })
export class FilterSitesPipe implements PipeTransform {
  public transform(sites: Site[], filter: string): Site[] {
    if (!sites || !sites.length) {
        return new Array<Site>();
    }
    if (!filter) {
        return sites;
    }

    let filterStringLower: string = filter.toLowerCase();

    return sites.filter((site: Site) => {
        return site.name.toLowerCase().indexOf(filterStringLower) >= 0 ||
            site.id.toLowerCase().indexOf(filterStringLower) >= 0;
    });
  }
}
