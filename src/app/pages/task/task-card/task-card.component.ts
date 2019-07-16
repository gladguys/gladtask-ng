import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatBottomSheet } from "@angular/material";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { TaskService } from "../../../core/services/task.service";
import { SharedService } from "../../../core/services/shared.service";
import { GTNotificationService } from "../../../core/services/gt-notification.service";

import { getPossibleStatus, Status, getStatusFromEnum } from "../../../shared/enums/status.enum";
import { Task } from "../../../shared/models/task.model";
import { TaskChange } from "../../../shared/models/task-change.model";
import { GladService } from 'src/app/core/services/glad.service';
import { TaskTimeSpentComponent } from "../task-time-spent/task-time-spent.component";
import { TaskRoutingNames } from '../task-routing-names';

@Component({
	selector: 'task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

	@ViewChild('timeSpent') timeSpentEl: ElementRef;
	@Input('task') task: Task;

	canEdit: boolean = false;

	possibleStatus: Array<Status>;
	taskForm: FormGroup;

	constructor(
		private taskService: TaskService,
		private sharedService: SharedService,
		private notificationService: GTNotificationService,
		private gladService: GladService,
		private bottomSheet: MatBottomSheet,
		private formBuilder: FormBuilder,
		private router: Router) {
	}

	ngOnInit() {
		this.possibleStatus = getPossibleStatus();

		this.taskForm = this.formBuilder.group({
			'title': [this.task.title, [Validators.required, Validators.minLength(6)]],
			'priority': ['', Validators.required],
			'description': [this.task.description, [Validators.required]],
			'targetUser': ['0'],
			'status': [this.task.status],
			'taskType': ['', Validators.required],
			'dueDate': [''],
			'project': [this.task.project.name]
		});

		this.canEdit = this.taskService.isTaskOwnerOrTargetOrTeamManager(this.task, this.sharedService.getUserLogged()._id);
		this.setupFormValueChanges();
	}

	buildTaskChange(whatHasChanged: string, oldValue: any, newValue: any): TaskChange {
		let taskChange = new TaskChange();
		taskChange.userFirstName = this.sharedService.getUserLogged().firstName;
		taskChange.whatHasChanged = whatHasChanged;
		taskChange.oldValue = oldValue;
		taskChange.newValue = newValue;
		return taskChange;
	}

	getColorCard() {
		if(this.task.priority == 'Normal') {
			return 'card-task--yellow'; 
		} else if (this.task.priority == 'Alto') {
			return 'card-task--red';
		}
	}

	setupFormValueChanges(): void {
		if (this.canEdit) {
			this.taskForm.controls['title'].valueChanges
				.pipe(debounceTime(500), distinctUntilChanged())
				.subscribe(value => {
					this.task.taskChanges.push(this.buildTaskChange("Título", this.task.title, value));
					this.task.title = value;
					this.taskService.createOrUpdate(this.task).subscribe(() => this.gladService.openSnack("task editada"),
						e => this.notificationService.notificateFailure("Falha ao criar equpe"));
				});
			
			this.taskForm.controls['description'].valueChanges
				.pipe(debounceTime(500), distinctUntilChanged())
				.subscribe(value => {
					this.task.taskChanges.push(this.buildTaskChange("Descrição", this.task.description, value));
					this.task.description = value;
					this.taskService.createOrUpdate(this.task).subscribe(() => this.gladService.openSnack("task editada"),
						e => this.notificationService.notificateFailure("Falha ao criar equpe"));
				});
			
			this.taskForm.controls['status'].valueChanges.subscribe(value => {
				this.task.taskChanges.push(this.buildTaskChange("Situação", this.task.status, value));
				this.task.status= value;
				this.taskService.createOrUpdate(this.task).subscribe(() => this.gladService.openSnack("task editada"),
					e => this.notificationService.notificateFailure("Falha ao criar equpe"));
			});
		}
	}

	showTaskDetail(task: Task): void {
		this.router.navigate([TaskRoutingNames.TASKS, TaskRoutingNames.TASK_FORM, task._id]);
	}

	openBottomSheetTimeSpent() {
		this.bottomSheet.open(TaskTimeSpentComponent, {
			data: { taskId: this.task._id }
		});
	}

	getEnum(status: string) {
		return getStatusFromEnum(status);
	}
}