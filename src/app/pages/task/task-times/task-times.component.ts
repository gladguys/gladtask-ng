import {Component} from "@angular/core";
import {TaskChange} from "../../../shared/models/task-change.model";
import {GroupByPipe} from "../../../shared/pipes/group-by.pipe";
import {TimeSpent} from "../../../shared/models/time-spent.model";

@Component({
	selector: 'gt-task-times',
	templateUrl: './task-times.component.html',
	styleUrls: ['./task-times.component.scss']
})
export class TaskTimesComponent {
	
	taskTimes: TimeSpent[] = [];

	constructor() { }

	setTaskTimes(taskTimes: TimeSpent[]) {
		this.taskTimes = taskTimes;
	}
}