import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription} from "rxjs";

import { TaskService } from "../../../core/services/task.service";
import { Task } from "../../../shared/models/task.model";
import { DateProximityPipe } from "../../../shared/pipes/date-proximity.pipe";
import { SharedService } from "../../../core/services/shared.service";
import { TaskRoutingNames } from '../../task/task-routing-names';
import { HomeUpdaterService } from "../../../core/services/home-updater.service";

export enum ProximityDate {
	ATRASADA = "Atrasada",
	HOJE = "Hoje",
	AMANHA = "Amanhã"
}

@Component({
	selector: 'due-soon-tasks',
	templateUrl: './due-soon-tasks.component.html',
	styleUrls: ['./due-soon-tasks.component.scss']
})
export class DueSoonTasksComponent implements OnInit, OnDestroy {
	
	homeUpdaterSubscription: Subscription;
	dueSoonTasks: Task[] = [];
	proximityDate = ProximityDate;

	@Input('dueDays') dueDays: number = 3;

	constructor(
		private taskService: TaskService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		private homeUpdater: HomeUpdaterService,
		private dateProximity: DateProximityPipe,
		private sharedService: SharedService) {}

	ngOnInit(): void {
		this.taskService.findBetweenDates(this.dueDays, this.sharedService.getUserLogged().id)
			.subscribe(tasks => this.dueSoonTasks = tasks);

		this.homeUpdaterSubscription = this.homeUpdater.getSubscriberHomeUpdate().subscribe(taskPublished => {
			let tasksCopy = [...this.dueSoonTasks];
			tasksCopy.forEach(task => {
				if (task.id === taskPublished.id) {
					task.title = taskPublished.title;
				}
			});
			this.dueSoonTasks = [...tasksCopy];
		});
	}

	showTaskDetail(task: Task) {
		this.router.navigate([TaskRoutingNames.TASKS, TaskRoutingNames.TASK_FORM, task.id]);
	}

	getDateProximityDescription(task: Task): string {
		return this.dateProximity.transform(task.dueDate);
	}
	
	ngOnDestroy(): void {
		this.homeUpdaterSubscription.unsubscribe();
	}
}
