import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from "@angular/common";

import { TaskFormComponent } from "../task-form/task-form.component";

import { TaskService } from "../../../core/services/task.service";
import { GladService } from "../../../core/services/glad.service";
import { SharedService } from "../../../core/services/shared.service";

import { MatButtonToggleChange } from "@angular/material";
import { Status } from 'src/app/shared/enums/status.enum';
import { Task } from "../../../shared/models/task.model";
import { TaskRoutingNames } from '../task-routing-names';

@Component({
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

	@ViewChild(TaskFormComponent) taskForm: TaskFormComponent;

	cardView: boolean = true;

	tasksDueToday: Task[] = [];
	tasksNotDueToday: Task[] = [];
	tasksDelayed: Task[] = [];
	tasksFinished: Task[] = [];

	today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
	todayDate = new Date();
	todayDateMilli = new Date(this.datePipe.transform(this.todayDate, 'yyyy-MM-dd')).getTime() as number;

	constructor(
		private taskService: TaskService,
		private gladService: GladService,
		private sharedService: SharedService,
		private router: Router,
		private activateRoute: ActivatedRoute,
		private datePipe: DatePipe) { }

	ngOnInit() {
		let tasksToMe = this.activateRoute.snapshot.data['tasksToMe'];

		this.tasksDueToday = this.getTasksDueToday(tasksToMe);
		this.tasksNotDueToday = this.getTasksNotDueToday(tasksToMe);
		this.tasksDelayed = this.getTasksDelayed(tasksToMe);
		this.tasksFinished = this.getTasksFinished(tasksToMe);
	}

	getTasksDueToday(tasks: Task[]): Task[] {
		return tasks.filter(task => this.datePipe.transform(task.dueDate, 'yyyy-MM-dd') === this.today);
	}
	
	getTasksNotDueToday(tasks: Task[]): Task[] {
		return tasks.filter(task => {
			let taskDueDateMilli = new Date(this.datePipe.transform(new Date(task.dueDate), 'yyyy-MM-dd')).getTime() as number;
			return taskDueDateMilli > this.todayDateMilli;
		});
	}

	getTasksDelayed(tasks: Task[]): Task[] {
		return tasks.filter(task => {
			let taskDueDateMilli = new Date(this.datePipe.transform(new Date(task.dueDate), 'yyyy-MM-dd')).getTime() as number;
			return taskDueDateMilli < this.todayDateMilli && task.status != Status.CONCLUIDA;
		});
	}

	getTasksFinished(tasks: Task[]): Task[] {
		return tasks.filter(task => task.status === Status.CONCLUIDA).slice(0, 10);
	}

	addTask() {
		this.router.navigate([TaskRoutingNames.TASKS, TaskRoutingNames.TASK_FORM]);
	}

	toggleView(change: MatButtonToggleChange){
		this.cardView = change.value;
	}
}
