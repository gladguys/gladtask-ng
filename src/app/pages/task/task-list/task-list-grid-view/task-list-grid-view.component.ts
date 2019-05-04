import {Component, Input, OnInit} from "@angular/core";

import { columnTaskDefinitions, localeText } from "../../../../shared/components/gt-grid/gt-grid-definitions";
import { TaskService } from "../../../../core/services/task.service";
import { GladService } from "../../../../core/services/glad.service";
import { SharedService } from "../../../../core/services/shared.service";
import { Router } from "@angular/router";
import { Task } from "../../../../shared/models/task.model";

@Component({
	selector: 'task-list-grid-view',
	templateUrl: './task-list-grid-view.component.html',
	styleUrls: ['./task-list-grid-view.component.scss']
})
export class TaskListGridViewComponent implements OnInit {
	@Input('tasksDueToday') tasksDueToday: Task[];
	@Input('tasksNotDueToday') tasksNotDueToday: Task[];
	@Input('tasksDelayed') tasksDelayed: Task[];
	@Input('tasksFinished') tasksFinished: Task[];

	gridOptions: any = {};
	localeText = localeText;
	columnTaskDefinitions = columnTaskDefinitions;
	
	constructor(
		private taskService: TaskService,
		private gladService: GladService,
		private sharedService: SharedService,
		private router: Router) { }

	ngOnInit(): void {
		this.configureGridRowStyle();
	}

	configureGridRowStyle(): void {
		this.gridOptions.getRowStyle = (params) => {
			if (params.data.priority === 'Baixo') {
				return null;
			} else if (params.data.priority === 'Normal') {
				return { background: 'yellow' };
			} else {
				return { background: 'red' };
			}
		};
	}

	onRowSelected(row):void {
		let task = row.data;
		this.router.navigate(['tasks', 'task-form', task.number]);
	}
}
