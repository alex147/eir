import { Pipe, PipeTransform } from '@angular/core';
import { Center } from '../model/center';

@Pipe({ name: 'filterCenters' })
export class FilterCentersPipe implements PipeTransform {
  public transform(centers: Center[], filter: string): Center[] {
    if (!centers || !centers.length) {
        return new Array<Center>();
    }
    if (!filter) {
        return centers;
    }

    let filterStringLower: string = filter.toLowerCase();

    return centers.filter((center: Center) => {
        return center.name.toLowerCase().indexOf(filterStringLower) >= 0 ||
            center.id.toLowerCase().indexOf(filterStringLower) >= 0;
    });
  }
}
