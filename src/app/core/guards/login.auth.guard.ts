import { SharedService } from 'src/app/core/services/shared.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginAuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private sharedService: SharedService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		if (this.sharedService.isUserLoggedIn() || this.sharedService.isUserInLocalStorage()) {
			this.router.navigate(['']);
		}
		return true;
	}
}
