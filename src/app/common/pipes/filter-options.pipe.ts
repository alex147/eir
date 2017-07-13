import { Pipe, PipeTransform } from '@angular/core';
import { AdminOption } from '../model/admin-option';

@Pipe({ name: 'filterOptions' })
export class FilterOptionsPipe implements PipeTransform {
  public transform(options: AdminOption[], filter: string): AdminOption[] {
    if (!options || !options.length) {
        return new Array<AdminOption>();
    }
    if (!filter) {
        return options;
    }

    let filterStringLower: string = filter.toLowerCase();

    return options.filter((adminOption: AdminOption) => {
        return adminOption.name.toLowerCase().indexOf(filterStringLower) >= 0;
    });
  }
}
