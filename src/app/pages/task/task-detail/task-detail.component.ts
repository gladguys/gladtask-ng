import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from 'src/app/shared/models/task.model';

import { TaskService } from "../../../core/services/task.service";
import { SharedService } from "../../../core/services/shared.service";
import { TaskChange } from "../../../shared/models/task-change.model";
import { GTNotificationService } from "../../../shared/components/gt-notification/gt-notification.service";

@Component({
	selector: 'task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

	task: Task = new Task();
	taskChanges: TaskChange[] = [];

	constructor(
		private taskService: TaskService,
		private activatedRoute: ActivatedRoute,
		private notificationService: GTNotificationService,
		private router: Router,
		private sharedService: SharedService) { }

	ngOnInit() {
		this.task = this.activatedRoute.snapshot.data['task'].content;
	}

	edit(id: string) {
		this.router.navigate(['tasks', '/task-form', id]);
	}

	remover(id: string): void {
		this.taskService.delete(id).subscribe(task => {
			this.notificationService.notificateSuccess("Atividade removida com sucesso");
			this.router.navigate(['/tasks']);
		}, e => this.notificationService.notificateFailure("Falha ao remover atividade"));
	}

	canChangeStatus() {
		return this.sharedService.getUserLogged().id === this.task.creatorUser.id ||
			this.sharedService.getUserLogged().id === this.task.targetUser.id;
	}

	canRemoveTask() {
		return this.sharedService.getUserLogged().id === this.task.creatorUser.id;
	}
}
