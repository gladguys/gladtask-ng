import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncEllipsesText'
})
export class TruncEllipsesTextPipe implements PipeTransform {

    transform(text: string): string {
        if (text.length >= 15) 
            return text.substring(0,15) + '...';
        return text;
    }
}