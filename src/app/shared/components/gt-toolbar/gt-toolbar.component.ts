import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { SubSink } from "subsink";

import { SharedService } from "../../../core/services/shared.service";
import { SideNavService } from "../../../core/services/side-nav.service";
import { GTConstants } from "../../../GT-constants";
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'gt-toolbar',
	templateUrl: './gt-toolbar.component.html',
	styleUrls: ['./gt-toolbar.component.scss']
})
export class GTToolbarComponent implements OnInit, OnDestroy {

	profileImg: string;
	version: string;
	public titleMenu: string;
	private subSink = new SubSink();

	constructor(
		private domSanitizer: DomSanitizer,
		private sharedService: SharedService,
		private sideNavService: SideNavService,
		public dialog: MatDialog) {}

	ngOnInit(): void {
		this.version = environment.VERSION;
		this.subSink.add(
			this.sharedService.getTitleNameMenu()
					  .subscribe( title => this.titleMenu = title));
		let userLogged = this.sharedService.getUserLogged();
		if (userLogged != null) {
			this.profileImg = 
				userLogged.profilePhoto ? userLogged.profilePhoto : GTConstants.GLADIATOR_DEFAULT_PROFILE;
		}
	}

	toggleSidenav(): void {
		this.sideNavService.toggleSideNav();
	}
	
	ngOnDestroy(): void {
		this.subSink.unsubscribe();
	}
}
