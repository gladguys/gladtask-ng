import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { TaskService } from "../../../core/services/task.service";
import { Task } from "../../../shared/models/task.model";
import { DateProximityPipe } from "../../../shared/pipes/date-proximity.pipe";
import { SharedService } from "../../../core/services/shared.service";
import {Observable} from "rxjs";
import { TaskRoutingNames } from '../../task/task-routing-names';
import { getStatusFromEnum, getStatusAsText, Status } from 'src/app/shared/enums/status.enum';

export enum ProximityDate {
	HOJE = "Hoje",
	AMANHA = "Amanhã"
}

@Component({
	selector: 'due-soon-tasks',
	templateUrl: './due-soon-tasks.component.html',
	styleUrls: ['./due-soon-tasks.component.scss']
})
export class DueSoonTasksComponent implements OnInit {

	dueSoonTasks$: Observable<Task[]>;
	proximityDate = ProximityDate;

	@Input('dueDays') dueDays: number = 3;

	constructor(
		private taskService: TaskService,
		private router: Router,
		private dateProximity: DateProximityPipe,
		private sharedService: SharedService) {}

	ngOnInit(): void {
		this.dueSoonTasks$ = this.taskService.findBetweenDates(this.dueDays, this.sharedService.getUserLogged().id);
	}

	showTaskDetail(task: Task) {
		this.router.navigate([TaskRoutingNames.TASKS, TaskRoutingNames.TASK_FORM, task.id]);
	}

	getDateProximityDescription(task: Task): string {
		return this.dateProximity.transform(task.dueDate);
	}

	getEnum(status: string) {
		return getStatusFromEnum(status);
	}

	getStatus(task: Task){
		console.log(getStatusAsText(task.status));
		return getStatusAsText(task.status);
	}
}
