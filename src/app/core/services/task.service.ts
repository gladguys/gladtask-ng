import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../../environments/environment";
import { Task } from "../../shared/models/task.model";
import { GladService } from "./glad.service";
import { TaskComment } from "../../shared/models/task-comment.model";
import { TimeSpent } from "../../shared/models/time-spent.model";
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root'
})
export class TaskService extends BaseService<Task> {

	constructor(
		protected http: HttpClient,
		protected gladService: GladService,
		protected injector: Injector) {
			super(injector, "/tasks");
		}

	findByTitleOrDescriptionLikeAllIgnoreCase(term: string): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/term/${term}`);
	}

	findTasksByTargetUser(userId: String): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/user-target/${userId}`);
	}

	findTasksByProject(projectId: String): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/project/${projectId}`);
	}

	findTasksByTargetUserAndStatus(userId: String, status: string): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/user-target/${userId}/${status}`);
	}

	findFirst4ByTargetUserIdOrderByLastEdited(userId: String): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/last-edited/${userId}`);
	}

	findTasksByTargetUserAndProject(userId: string, projectId: string): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/project/${userId}/${projectId}`);
	}

	findTasksByCreatorUser(userId: String): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/user-creator/${userId}`);
	}

	findBetweenDates(days: number, userId: string): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/between/${days}/${userId}`);
	}

	updateTaskStatus(taskId: string, status: string, ignoreLoader: boolean = false): Observable<Task> {
		return this.http.put<Task>(`${environment.API}/tasks/${taskId}/update-status/${status}`,
			this.gladService.getIgnoreLoaderParam(ignoreLoader));
	}

	findTasksLookAlikeByTitle(title: string, ignoreLoader: boolean = false): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.API}/tasks/similar/title/${title}`,
			this.gladService.getIgnoreLoaderParam(ignoreLoader));
	}

	saveTaskComment(id: string, taskComment: TaskComment, ignoreLoader: boolean = false): Observable<Task> {
		return this.http.post<Task>(`${environment.API}/tasks/${id}/save-comment`, taskComment,
			this.gladService.getIgnoreLoaderParam(ignoreLoader));
	}

	saveTimeSpent(id: string, timeSpent: TimeSpent, ignoreLoader: boolean = false): Observable<Task> {
		return this.http.post<Task>(`${environment.API}/tasks/${id}/save-time-spent`, timeSpent,
			this.gladService.getIgnoreLoaderParam(ignoreLoader));
	}

	isTaskOwnerOrTargetOrTeamManager(task: Task, userId: string): boolean {
		let isTaskOwner = task.creatorUser._id === userId;
		let isTaskTarget = task.targetUser._id === userId;
		let isUserTeamManager = task.project.team.manager._id === userId;

		return isTaskOwner || isTaskTarget || isUserTeamManager;
	}
}
