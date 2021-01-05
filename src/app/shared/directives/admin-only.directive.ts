import { Directive, ElementRef, Renderer2 } from '@angular/core';

import { SharedService } from '../../core/services/shared.service';

@Directive({
  selector: '[adminOnly]',
})
export class AdminOnlyDirective {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    sharedService: SharedService
  ) {
    if (sharedService.isUserLoggedIn()) {
      let user = sharedService.getUserLogged();
      user.profileEnum !== 'ROLE_ADMIN' &&
        renderer.setStyle(el.nativeElement, 'display', 'none');
    }
  }
}
