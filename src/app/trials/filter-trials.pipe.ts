import { Pipe, PipeTransform } from '@angular/core';
import { Trial } from './trial';

@Pipe({ name: 'filterTrials' })
export class FilterTrialsPipe implements PipeTransform {
  public transform(trials: Trial[], filter: string): Trial[] {
    if (!trials || !trials.length) {
        return new Array<Trial>();
    }
    if (!filter) {
        return trials;
    }

    let filterStringLower: string = filter.toLowerCase();

    return trials.filter((trial: Trial) => {
        return trial.name.toLowerCase().indexOf(filterStringLower) >= 0 ||
            trial.description.toLowerCase().indexOf(filterStringLower) >= 0 ||
            trial.id.toLowerCase().indexOf(filterStringLower) >= 0;
    });
  }
}
