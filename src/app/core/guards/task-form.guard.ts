import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { MatDialog} from "@angular/material";
import { Observable } from "rxjs";

import { TaskFormComponent } from "../../pages/task/task-form/task-form.component";
import { GTConfirmationDialogComponent } from "../../shared/components/gt-confirmation-dialog/gt-confirmation-dialog.component";

@Injectable()
export class TaskFormGuard implements CanDeactivate<TaskFormComponent> {

	constructor(private matDialog: MatDialog) {}

	canDeactivate(component: TaskFormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean>  | boolean {
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