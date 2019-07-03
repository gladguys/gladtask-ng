import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { TaskService } from '../../core/services/task.service';
import { SharedService } from '../../core/services/shared.service';
import { Task } from '../../shared/models/task.model'
import { Status, getStatusFromEnum } from '../../shared/enums/status.enum';
import { TaskRoutingNames } from '../task/task-routing-names';

@Component({
	templateUrl: './kanban.component.html',
	styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {

	tasks: Task[] = [];
	createdTasks: Task[] = [];
	todoTasks: Task[] = [];
	doingTasks: Task[] = [];
	doneTasks: Task[] = [];

	created = [];
	todo = [];
	doing = [];
	done = [];
	
	constructor(
		private taskService: TaskService,
		private sharedService: SharedService,
		private router: Router) {}
	
	ngOnInit() {
		let id = this.sharedService.getUserLogged().id;
		this.taskService.findTasksByTargetUser(id).subscribe(tasks => {
			this.tasks = tasks;
			this.createdTasks = tasks.filter(task => task.status === getStatusFromEnum(Status.CRIADA));
			this.created = this.createdTasks.map(task => task.title);

			this.todoTasks = tasks.filter(task => task.status === getStatusFromEnum(Status.EM_ESPERA));
			this.todo = this.todoTasks.map(task => task.title);

			this.doingTasks = tasks.filter(task => task.status === getStatusFromEnum(Status.EM_ANDAMENTO));
			this.doing = this.doingTasks.map(task => task.title);
			
			this.doneTasks = tasks.filter(task => task.status === getStatusFromEnum(Status.CONCLUIDA));
			this.done = this.doneTasks.map(task => task.title);
		});
	}

	drop(event: CdkDragDrop<string[]>) {
		let oldCreated = Object.assign([], this.created);
		let oldTodo = Object.assign([], this.todo);
		let oldDoing = Object.assign([], this.doing);
		let oldDone = Object.assign([], this.done);

		this.handleDropEvent(event);

		let diferences = this.checkForDiferences(oldCreated, oldTodo, oldDoing, oldDone);
		let changedValue = diferences[0];

		if (changedValue !== undefined) {
			let task = this.findTaskByTitle(changedValue);
			let taskStatus = this.decideTargetStatus(changedValue);
			this.taskService.updateTaskStatus(task.id, taskStatus, true).subscribe(c => {});
		}
	}

	private handleDropEvent(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		}
	}

	checkForDiferences(oldCreated: string[], oldTodos: string[], oldDoings: string[], oldDones: string[]): string[] {
		let missingCreated = oldCreated.filter(item => this.created.indexOf(item) < 0);
		let missingCreatedReverse = this.created.filter(item => oldCreated.indexOf(item) < 0);
		let diferenceCreated = [...missingCreated, ...missingCreatedReverse];

		let missingTodo = oldTodos.filter(item => this.todo.indexOf(item) < 0);
		let missingTodoReverse = this.todo.filter(item => oldTodos.indexOf(item) < 0);
		let diferenceTodo = [...missingTodo, ...missingTodoReverse];
		
		let missingDoing = oldDoings.filter(item => this.doing.indexOf(item) < 0);
		let missingDoingReverse = this.doing.filter(item => oldDoings.indexOf(item) < 0);
		let diferenceDoing = [...missingDoing, ...missingDoingReverse];
		
		let missingDone = oldDones.filter(item => this.done.indexOf(item) < 0);
		let missingDoneReverse = this.done.filter(item => oldDones.indexOf(item) < 0);
		let diferenceDone = [...missingDone, ...missingDoneReverse];

		//Normalizing diferences
		return [diferenceCreated[0], diferenceTodo[0], diferenceDoing[0], diferenceDone[0]].filter(c => c !== undefined);
	}

	decideTargetStatus(taskTitle: string): string {
		if (this.foundTaskIn(taskTitle, this.created)) {
			return Status.CRIADA;
		} else if (this.foundTaskIn(taskTitle, this.todo)) {
			return Status.EM_ESPERA;
		} else if (this.foundTaskIn(taskTitle, this.doing)) {
			return Status.EM_ANDAMENTO;
		} else if (this.foundTaskIn(taskTitle, this.done)) {
			return Status.CONCLUIDA;
		}
	}

	foundTaskIn(taskTitle: string, titles: string[]): boolean {
		return titles.filter(t => t === taskTitle).length > 0
	}

	findTaskByTitle(taskTitle: string): Task {
		return this.tasks.filter(t => t.title === taskTitle)[0];
	}

	showTaskDetail(task: Task): void {
		this.router.navigate([TaskRoutingNames.TASKS, TaskRoutingNames.TASK_FORM, task.id]);
	}
}
