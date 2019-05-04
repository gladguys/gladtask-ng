import { Component, Input } from '@angular/core';

@Component({
  selector: 'gt-form-success',
  templateUrl: './gt-form-success.component.html',
  styleUrls: ['./gt-form-success.component.css']
})
export class GTFormSuccessComponent {

	@Input('successMessage') successMessage: string = 'none';

	constructor() { }

    temMensagem() {
        return !(this.successMessage === null || this.successMessage === 'none');
    }
}
