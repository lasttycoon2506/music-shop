import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positiveIntegersOnly',
})
export class PositiveIntegersOnlyPipe implements PipeTransform {
  transform(value: number): number {
    if (value < 0) {
      value = 0;
      return value;
    }
    return value;
  }
}
