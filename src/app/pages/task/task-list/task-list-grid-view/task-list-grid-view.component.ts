import { Component, Input } from "@angular/core";

import { Task } from "../../../../shared/models/task.model";

@Component({
	selector: 'task-list-grid-view',
	templateUrl: './task-list-grid-view.component.html',
	styleUrls: ['./task-list-grid-view.component.scss']
})
export class TaskListGridViewComponent {
	@Input('tasksDueToday') tasksDueToday: Task[];
	@Input('tasksNotDueToday') tasksNotDueToday: Task[];
	@Input('tasksDelayed') tasksDelayed: Task[];
	@Input('tasksFinished') tasksFinished: Task[];
}
