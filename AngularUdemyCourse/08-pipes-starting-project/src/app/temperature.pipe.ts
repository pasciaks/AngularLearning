import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
  // pure: false, // default is true, by being false it will not cache result
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number | null, ...args: string[]): string {
    let unit = '';
    let decimals = 0;

    if (!args || args.length === 0) {
      return '' + value + '°';
    }

    if (args && args.length === 2) {
      // handle two arguments
      decimals = parseInt(args[1], 10);
    }

    console.log(args);
    console.log(value);

    value = parseFloat(value as string);

    if (args[0] === 'CF') {
      // value provided in C convert to F
      value = (value * 9.0) / 5.0 + 32;
      unit = 'F';
    } else if (args[0] === 'CK') {
      // value provided in C convert to K
      value = value + 273.15;
      unit = 'K';
    } else if (args[0] === 'FK') {
      // value provided in F convert to K
      value = ((value - 32) * 5.0) / 9.0 + 273.15;
      unit = 'K';
    } else if (args[0] === 'FC') {
      // value provided in F convert to C
      value = ((value - 32) * 5.0) / 9.0;
      unit = 'C';
    } else if (args[0] === 'KC') {
      // value provided in K convert to C
      value = value - 273.15;
      unit = 'C';
    } else if (args[0] === 'KF') {
      // value provided in K convert to F
      value = ((value - 273.15) * 9.0) / 5.0 + 32;
      unit = 'F';
    } else if (args[0] === 'CC') {
      // value provided in C convert to C
      unit = 'C';
    } else if (args[0] === 'FF') {
      // value provided in F convert to F
      unit = 'F';
    } else if (args[0] === 'KK') {
      // value provided in K convert to K
      unit = 'K';
    }

    console.log(value);
    // round value to # of decimals
    value = parseFloat(value.toFixed(decimals));

    console.log(value);
    return '' + value + '°' + unit;
  }
}
