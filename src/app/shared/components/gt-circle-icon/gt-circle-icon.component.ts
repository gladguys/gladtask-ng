import { Component, Input } from '@angular/core';

@Component({
    selector: 'gt-circle-icon',
    templateUrl: './gt-circle-icon.component.html',
    styleUrls: ['./gt-circle-icon.component.scss']
})
export class GTCircleIconComponent {

    @Input()
    color: string;
}