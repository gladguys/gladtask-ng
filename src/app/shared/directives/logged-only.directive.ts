import { Directive, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { SharedService } from "../../core/services/shared.service";

@Directive({
  selector: '[loggedOnly]'
})
export class LoggedOnlyDirective implements OnChanges {

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private sharedService: SharedService
	) {
		if(!this.sharedService.isUserLoggedIn()) {
			this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(!this.sharedService.isUserLoggedIn()) {
			this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
		}
	}
}
