import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourMinute',
})
export class HourMinutePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let hours = Math.floor(value / 60);
    let minutes = value % 60;

    let phrase = '';
    if (hours > 0) {
      phrase = hours === 1 ? hours + ' hora' : hours + ' horas';

      if (minutes > 0) {
        phrase +=
          minutes === 1
            ? ' e ' + minutes + ' minuto'
            : ' e ' + minutes + ' minutos';
      }
    } else {
      phrase += minutes + ' minutos';
    }

    return phrase;
  }
}
