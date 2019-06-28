import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { MatDialog} from "@angular/material";
import { Observable } from "rxjs";

import { TaskFormComponent } from "../../pages/task/task-form/task-form.component";
import { GTConfirmationDialogComponent } from "../../shared/components/gt-confirmation-dialog/gt-confirmation-dialog.component";
import { SharedService } from "../services/shared.service";

@Injectable()
export class TaskFormGuard implements CanDeactivate<TaskFormComponent> {

	constructor(
		private matDialog: MatDialog,
		private sharedService: SharedService) {}

	canDeactivate(component: TaskFormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean>  | boolean {
		if (!this.sharedService.isUserLoggedIn()) {
			return true;
		}

		if (component.isDirty() && !component.saved) {
			let dialogRef = this.matDialog.open(GTConfirmationDialogComponent, {
				width: '400px'
			});
			dialogRef.componentInstance.confirmMessage = 'fomulário task';

			return dialogRef.afterClosed();
		} else {
			return true;
		}
	}
}