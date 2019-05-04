import { Component, Input } from '@angular/core';

@Component({
  selector: 'gt-form-error',
  templateUrl: './gt-form-error.component.html',
  styleUrls: ['./gt-form-error.component.scss']
})
export class GTFormErrorComponent {

	@Input('errorMessage') errorMessage: string = 'Campo Obrigatório';

	constructor() { }
}
