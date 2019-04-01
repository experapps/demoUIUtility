import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberfr'
})
export class FrenchDecimalPipe implements PipeTransform {

  transform(val: number): string {
    // Format the output to display any way you want here.
    // For instance:
    if (val !== undefined && val !== null) {
      return val.toLocaleString(/*arguments you need*/);
    } else {
      return '';
    }
  }
}