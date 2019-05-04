import { Component } from '@angular/core';

import { TaskChange } from "../../../shared/models/task-change.model";
import { GroupByPipe } from "../../../shared/pipes/group-by.pipe";

@Component({
	selector: 'gt-task-changes',
	templateUrl: './task-changes.component.html',
	styleUrls: ['./task-changes.component.scss']
})
export class TaskChangesComponent {

	taskChanges: TaskChange[] = [];
	taskChangesGroupedBy: any[];

	constructor() { }

	setTaskChanges(taskChanges: TaskChange[]) {
		this.taskChanges = taskChanges;
		let groupByPipe = new GroupByPipe();
		this.taskChangesGroupedBy = groupByPipe.transform(this.taskChanges, 'date');
	}
}
