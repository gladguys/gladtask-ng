import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatDialog } from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import  {BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';

import { TaskService } from "../../../core/services/task.service";
import { ProjectService } from "../../../core/services/project.service";
import { UserService } from "../../../core/services/user.service";
import { TeamService } from '../../../core/services/team.service';
import { GladService } from "../../../core/services/glad.service";
import { GTNotificationService } from "../../../core/services/gt-notification.service";
import { SharedService } from "../../../core/services/shared.service";
import { TaskCommentsService } from "../../../core/services/task-comments.service";
import { TimeSpentService } from "./time-spent.service";

import { TaskChangesComponent } from "../task-changes/task-changes.component";
import { TaskCommentsComponent } from "../task-comments/task-comments.component";
import { TaskTimeSpentComponent } from "../task-time-spent/task-time-spent.component";
import { TaskTimesComponent } from "../task-times/task-times.component";
import { ProjectFormComponent } from "../../project/project-form/project-form.component";

import { Task } from "../../../shared/models/task.model";
import { TimeSpent } from "../../../shared/models/time-spent.model";
import { TaskChange } from "../../../shared/models/task-change.model";
import { TaskComment } from "../../../shared/models/task-comment.model";
import { Project } from "../../../shared/models/project.model";
import { getPossibleStatus, Status, getStatusFromEnum } from "../../../shared/enums/status.enum";
import { possibleTaskTypes, TaskType } from "../../../shared/enums/task-type.enum";

import { ValidateTitleEqualDesc } from "../../../shared/validators/title-equal-description.validator";


@Component({
	selector: 'task-form',
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

	@ViewChild('taskTimes') taskTimesComponent: TaskTimesComponent;
	@ViewChild('taskChanges') taskChangesComponent: TaskChangesComponent;
	@ViewChild('taskComments') taskCommentsComponent: TaskCommentsComponent;
	@ViewChild('textComment') textCommentEl: ElementRef;
	
	task: Task;

	possibleTargetUsers$: Observable<User[]>;
	possibleTeams$: Observable<Team[]>;
	
	taskChanges: Array<TaskChange> = [];
	taskComments: Array<TaskComment> = [];
	possibleStatus: Array<Status> = [];
	possibleTaskTypes: Array<TaskType> = [];
	possibleProjects: Array<Project> = [];

	timeSpent$: BehaviorSubject<TimeSpent>;

	taskForm: FormGroup;

	debounceTitle: Subject<string> = new Subject<string>();
	lookAlikeTasksByTitle: Task[] = [];
	hasLookAlike: boolean;

	dueDate: Date;
	minDate = new Date();

	constructor(
		private formBuilder: FormBuilder,
		private taskService: TaskService,
		private timeSpentService: TimeSpentService,
		private gladService: GladService,
		private taskCommentsService: TaskCommentsService,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private bottomSheet: MatBottomSheet,
		private projectService: ProjectService,
		private matDialog: MatDialog,
		private notificationService: GTNotificationService,
		private teamService: TeamService,
		private sharedService: SharedService,
		public dialog: MatDialog) { }

	ngOnInit() {
		this.timeSpent$ = this.timeSpentService.getTimeSpentSubject();
		this.initializeForm();
		this.getPossibleOptions();
		this.configureTitleLookAlikeSearch();

		this.taskForm.controls['team'].valueChanges.subscribe(team => this.loadProjects(team.id));

		this.task = this.activatedRoute.snapshot.data['task'];
		if (this.task === undefined) {
			this.task = new Task();
		} else {
			this.taskForm.disable();
			this.taskChanges = this.task.taskChanges;
			this.taskChangesComponent.setTaskChanges(this.task.taskChanges);
			this.taskTimesComponent.setTaskTimes(this.task.timeSpentValues);
			this.taskComments = this.task.taskComments;
			this.taskCommentsService.setUpdatedComments(this.task.taskComments);
			this.populateForm(this.task);
		}
	}

	private initializeForm() {
		this.taskForm = this.formBuilder.group({
				'title': ['', [Validators.required, Validators.minLength(6)]],
				'priority': ['', Validators.required],
				'description': ['', [Validators.required]],
				'targetUser': ['', Validators.required],
				'status': ['', Validators.required],
				'taskType': ['', Validators.required],
				'dueDate': [''],
				'team': [null],
				'estimatedTime': [''],
				'project': ['']
			},
			{ validator: ValidateTitleEqualDesc });
	}

	private getPossibleOptions() {
		this.possibleStatus = getPossibleStatus();
		this.possibleTaskTypes = possibleTaskTypes();
		this.possibleTargetUsers$ = this.userService.findAll();
		this.possibleTeams$ = this.teamService.findAllByUser(this.sharedService.getUserLogged().id);
	}

	private configureTitleLookAlikeSearch() {
		this.debounceTitle.pipe(debounceTime(800), distinctUntilChanged()).subscribe(title => {
			if (title.length > 5 && title.match(/[a-z]/i)) {
				this.lookAlikeTasksByTitle = this.getLookAlikeTasksByTitle(title);
			} else {
				this.lookAlikeTasksByTitle = [];
			}
		});
	}

	compareUser(x: User, y: User): boolean {
		return x && y ? x.id === y.id : x === y;
	}

	compareProject(x: Project, y: Project): boolean {
		return x && y ? x.id === y.id : x === y;
	}

	compareTeam(x: Team, y: Team): boolean {
		return x && y ? x.id === y.id : x === y;
	}

	populateForm(task: Task): void {
		this.taskForm.patchValue({
			title: task.title,
			priority: this.getPriorityFromTask(task.priority),
			description: task.description,
			targetUser: task.targetUser,
			status: task.status,
			taskType: task.taskType,
			team: task.project.team,
			project: task.project,
			estimatedTime: task.estimatedTime
		});

		if (task.dueDate != undefined) {
			this.dueDate = new Date(task.dueDate);
		}

		if (task.id == undefined) {
			this.resetForm();
		}
	}

	getPriorityFromTask(priorityText) {
		switch (priorityText) {
			case ("Alto"):
				return "0";
			case ("Normal"):
				return "1";
			case ("Baixo"):
				return "2";
		}
	}

	onSubmit() {
		let isEdit = this.task.id != undefined;
		const submittedTask = this.taskForm.getRawValue() as Task;
		submittedTask.taskComments = this.taskComments;

		if (isEdit) {
			submittedTask.id = this.task.id;
			submittedTask.creatorUser = this.task.creatorUser;
			submittedTask.taskChanges = this.task.taskChanges != undefined ? this.task.taskChanges : [];

			if (submittedTask.title !== this.task.title) {
				let taskChangeTitulo = this.buildTaskChange('Título', this.task.title, submittedTask.title);
				submittedTask.taskChanges.push(taskChangeTitulo);
			}
			if (submittedTask.description !== this.task.description) {
				let taskChangeDescription = this.buildTaskChange('Descrição', this.task.description, submittedTask.description);
				submittedTask.taskChanges.push(taskChangeDescription);
			}
			if (submittedTask.status !== this.task.status) {
				let taskChangeStatus = this.buildTaskChange('Situação', this.task.status, submittedTask.status);
				submittedTask.taskChanges.push(taskChangeStatus);
			}
		}

		this.taskService.createOrUpdate(submittedTask)
			.subscribe(task => {
				this.task = task;
				if (!isEdit) {
					this.gladService.openSnack("Task criada");
				} else {
					this.gladService.openSnack("Task editada");
				}
				this.matDialog.closeAll();
			}, 
			e => this.notificationService.notificateFailure("Falha ao criar equpe"));
	}

	buildTaskChange(whatHasChanged: string, oldValue: any, newValue: any): TaskChange {
		let taskChange = new TaskChange();
		taskChange.userFirstName = this.sharedService.getUserLogged().firstName;
		taskChange.whatHasChanged = whatHasChanged;
		taskChange.oldValue = oldValue;
		taskChange.newValue = newValue;
		return taskChange;
	}

	getTaskTypeDescription(taskType: TaskType): string {
		switch (taskType) {
			case TaskType.TESTE: return "Teste";
			case TaskType.REUNIAO: return "Reunião";
			case TaskType.MELHORIA: return "Melhoria";
			case TaskType.FEATURE: return "Feature";
			case TaskType.BUG: return "Bug";
			case TaskType.ALINHAMENTO: return "Alinhamento";
			case TaskType.DOCUMENTACAO: return "Documentação";
			case TaskType.OUTRO: return "Outro";
		}
	}

	resetForm() {
		this.taskForm.reset();
		for (let i in this.taskForm.controls) {
			this.taskForm.controls[i].setErrors(null);
		}
	}

	getLookAlikeTasksByTitle(title: string): any {
		this.taskService.findTasksLookAlikeByTitle(title, true).subscribe(tasks => {
			this.hasLookAlike = tasks.length > 0;
			this.lookAlikeTasksByTitle = tasks;
		});
	}

	loadProjects(teamId: string) {
		this.projectService.findAllByTeam(teamId, true).subscribe( projects => this.possibleProjects = projects);
	}

	addComment() {
		let taskComment = new TaskComment();
		taskComment.user = this.sharedService.getUserLogged();
		taskComment.text = this.textCommentEl.nativeElement.value;

		//The api returns the dates as numbers, so for the comments sorting works i have to make this hack
		let dateNow = new Date();
		taskComment.date = dateNow.getTime().toString();
		this.taskComments.push(taskComment);
		this.taskCommentsService.setUpdatedComments(this.taskComments);
		
		if (this.task.id !== undefined) {
			taskComment.date = dateNow.toISOString();
			this.taskService.saveTaskComment(this.task.id, taskComment, true).subscribe(t => {});
		}
		
		this.textCommentEl.nativeElement.value = '';
	}
	
	openBottomSheetTimeSpent() {
		const bottomSheetRef = this.bottomSheet.open(TaskTimeSpentComponent, {
			data: { taskId: this.task.id },
			panelClass: 'mat-bottom-sheet-container-time-spent'
		});

		bottomSheetRef.afterDismissed().subscribe(() => {
			this.task.timeSpentValues.push(this.timeSpent$.getValue());
			this.taskTimesComponent.setTaskTimes(this.task.timeSpentValues);
		})
	}
	
	openNewProjectDialog() {
		let dialogRef = this.matDialog.open(ProjectFormComponent, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe((newProject: Project) => {
			if (this.taskForm.value.team.id == newProject.team.id) {
				this.loadProjects(newProject.team.id);
			}
		});
	}

	getEnum(status: string) {
		return getStatusFromEnum(status);
	}
}
