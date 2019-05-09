import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { TaskService } from "../../../core/services/task.service";
import { SharedService } from "../../../core/services/shared.service";
import { GTNotificationService } from "../../../shared/components/gt-notification/gt-notification.service";

import { getPossibleStatus, Status } from "../../../shared/enums/status.enum";
import { Task } from "../../../shared/models/task.model";
import { TaskChange } from "../../../shared/models/task-change.model";
import { GladService } from 'src/app/core/services/glad.service';
import {TimeSpent} from "../../../shared/models/time-spent.model";
import {MatBottomSheet} from "@angular/material";
import {TaskTimeSpentComponent} from "../task-time-spent/task-time-spent.component";

@Component({
	selector: 'task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

	@ViewChild('timeSpent') timeSpentEl: ElementRef;
	@Input('task') task: Task;

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

	setupFormValueChanges(): void {
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

	showTaskDetail(task: Task): void {
		this.router.navigate(['tasks', 'task-form', task.id]);
	}

	openBottomSheetTimeSpent() {
		const bottomSheetRef = this.bottomSheet.open(TaskTimeSpentComponent, {
			data: { task: this.task }
		});
		bottomSheetRef.afterDismissed().subscribe(() => {
			//TODO: reatualizar componente de soma de horas card
		});
	}
}