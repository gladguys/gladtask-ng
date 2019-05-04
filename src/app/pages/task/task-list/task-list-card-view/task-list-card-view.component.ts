import { Component, Input } from "@angular/core";
import { Task } from "../../../../shared/models/task.model";

@Component({
	selector: 'task-list-card-view',
	templateUrl: './task-list-card-view.component.html',
	styleUrls: ['./task-list-card-view.component.scss']
})
export class TaskListCardViewComponent {
	@Input('tasksDueToday') tasksDueToday: Task[];
	@Input('tasksNotDueToday') tasksNotDueToday: Task[];
	@Input('tasksDelayed') tasksDelayed: Task[];
	@Input('tasksFinished') tasksFinished: Task[];
}
