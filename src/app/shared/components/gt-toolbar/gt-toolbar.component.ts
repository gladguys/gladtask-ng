import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

import { SharedService } from "../../../core/services/shared.service";
import { SideNavService } from "../../../core/services/side-nav.service";
import { GTConstants } from "../../../GT-constants";
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'gt-toolbar',
	templateUrl: './gt-toolbar.component.html',
	styleUrls: ['./gt-toolbar.component.scss']
})
export class GTToolbarComponent implements OnInit {

	profileImg: string;
	version: string;
	public titleMenu: string;

	constructor(
		private domSanitizer: DomSanitizer,
		private sharedService: SharedService,
		private sideNavService: SideNavService,
		public dialog: MatDialog) {}

	ngOnInit(): void {
		this.version = environment.VERSION;
		this.sharedService.getTitleNameMenu().subscribe( title => this.titleMenu = title);
		let userLogged = this.sharedService.getUserLogged();
		if (userLogged != null) {
			this.profileImg = userLogged.profilePhoto ? userLogged.profilePhoto : GTConstants.GLADIATOR_DEFAULT_PROFILE;
		}
	}

	toggleSidenav(): void {
		this.sideNavService.toggleSideNav();
	}
}
