import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { SharedService } from "../../../core/services/shared.service";
import { User } from "../../models/user.model";

@Component({
	selector: 'gt-user-logged-info',
	templateUrl: './gt-user-logged-info.component.html',
	styleUrls: ['./gt-user-logged-info.component.scss']
})
export class GTUserLoggedInfoComponent implements OnInit {

	userLogged: User;

	constructor(
		private domSanitizer: DomSanitizer,
		private sharedService: SharedService,
		private router: Router) {}

	ngOnInit(): void {
		this.userLogged = this.sharedService.getUserLogged();
	}

	logout(): void {
		this.sharedService.logout();
		this.router.navigate(['/login']);
	}
}
