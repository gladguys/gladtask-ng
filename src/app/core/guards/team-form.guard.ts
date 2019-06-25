import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { MatDialog} from "@angular/material";
import { Observable } from "rxjs";

import { GTConfirmationDialogComponent } from "../../shared/components/gt-confirmation-dialog/gt-confirmation-dialog.component";
import { TeamFormComponent } from 'src/app/pages/team/team-form/team-form.component';
import { SharedService } from "../services/shared.service";

@Injectable()
export class TeamFormGuard implements CanDeactivate<TeamFormComponent> {

	constructor(
		private matDialog: MatDialog,
		private sharedService: SharedService) {}

	canDeactivate(component: TeamFormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean>  | boolean {
		if (!this.sharedService.isUserLoggedIn()) {
			return true;
		}

        if (component.isDirty()) {
			let dialogRef = this.matDialog.open(GTConfirmationDialogComponent, {
				width: '400px'
			});
			dialogRef.componentInstance.confirmMessage = 'formulário equipe'

			return dialogRef.afterClosed();
		} else {
			return true;
		}
	}
}