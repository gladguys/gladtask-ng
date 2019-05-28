import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { MatDialog} from "@angular/material";
import { Observable } from "rxjs";

import { GTConfirmationDialogComponent } from "../../shared/components/gt-confirmation-dialog/gt-confirmation-dialog.component";
import { TeamFormComponent } from 'src/app/pages/team/team-form/team-form.component';

@Injectable()
export class TeamFormGuard implements CanDeactivate<TeamFormComponent> {

	constructor(private matDialog: MatDialog) {}

	canDeactivate(component: TeamFormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean>  | boolean {
        console.log("dededededededede");
        if (component.isDirty()) {
			let dialogRef = this.matDialog.open(GTConfirmationDialogComponent, {
				width: '500px'
			});
			dialogRef.componentInstance.confirmMessage = 'Sair da página fará você perder todas as informações. Deseja sair mesmo assim?'

			return dialogRef.afterClosed();
		} else {
			return true;
		}
	}
}