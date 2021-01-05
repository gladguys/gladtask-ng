import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncEllipsesText'
})
export class TruncEllipsesTextPipe implements PipeTransform {

    transform(text: string, arg1: number): string {
        if (arg1 == null) arg1 = 15;
        if (text.length >= 15) 
            return text.substring(0,arg1) + '...';
        return text;
    }
}