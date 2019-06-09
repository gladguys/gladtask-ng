import {AfterViewInit, Directive, Input,  TemplateRef, ViewContainerRef} from '@angular/core';

import { SharedService } from "../../core/services/shared.service";
import { Task } from "../models/task.model";
import {TaskService} from "../../core/services/task.service";

@Directive({
	selector: '[ifCreatorOrTargetOrManager]'
})
export class IfCreatorOrTargetOrManagerDirective implements AfterViewInit {

	@Input('ifCreatorOrTargetOrManager') task: Task;

	constructor(
		private sharedService: SharedService,
		private taskService: TaskService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {}

	ngAfterViewInit(): void {
		const canEdit = this.taskService.isTaskOwnerOrTargetOrTeamManager(this.task, this.sharedService.getUserLogged().id);
		if (canEdit) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainer.clear();
		}
	}
}
