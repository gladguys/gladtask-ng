import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedService } from '../../core/services/shared.service';
import { TaskService } from "../../core/services/task.service";
import { Task } from "../models/task.model";

@Injectable({
	providedIn: 'root'
})
export class TaskListToMeResolver implements Resolve<Observable<Task[]>> {

	constructor(
		private taskService: TaskService,
		private sharedService: SharedService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
		let userId = this.sharedService.getUserLogged().id;
		return this.taskService.findTasksByTargetUser(userId);
	}
}
