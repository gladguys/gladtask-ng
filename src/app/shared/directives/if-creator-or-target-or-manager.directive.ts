import {AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

import { SharedService } from "../../core/services/shared.service";
import { Task } from "../models/task.model";
import {TaskService} from "../../core/services/task.service";

@Directive({
	selector: '[ifCreatorOrTargetOrManager]'
})
export class IfCreatorOrTargetOrManagerDirective implements AfterViewInit {

	@Input('ifCreatorOrTargetOrManager') task: Task;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private sharedService: SharedService,
		private taskService: TaskService,
		private templateRef : TemplateRef<any>,
		private viewContainer : ViewContainerRef
	) {
		console.log('rrrrrr');
	}
	
	ngAfterViewInit(): void {
		console.log('aaaaaaaaa');
		const canEdit = this.taskService.isTaskOwnerOrTargetOrTeamManager(this.task, this.sharedService.getUserLogged().id);
		console.log(canEdit);
	}
}
