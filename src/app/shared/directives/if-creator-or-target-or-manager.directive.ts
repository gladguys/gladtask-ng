import {AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

import { SharedService } from "../../core/services/shared.service";
import { Task } from "../models/task.model";
import {TaskService} from "../../core/services/task.service";

@Directive({
	selector: '[ifCreatorOrTargetOrManager]'
})
export class IfCreatorOrTargetOrManagerDirective implements AfterViewInit {

	@Input() task: Task;

	constructor(
		private sharedService: SharedService,
		private taskService: TaskService
	) {
	}
	
	ngAfterViewInit(): void {
		const canEdit = this.taskService.isTaskOwnerOrTargetOrTeamManager(this.task, this.sharedService.getUserLogged().id);
	}
}
