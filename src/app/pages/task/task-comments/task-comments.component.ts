import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { TaskComment } from "../../../shared/models/task-comment.model";
import { TaskCommentsService } from "../../../core/services/task-comments.service";

@Component({
	selector: 'gt-task-comments',
	templateUrl: './task-comments.component.html',
	styleUrls: ['./task-comments.component.scss']
})
export class TaskCommentsComponent implements OnInit {
	taskComments$: Observable<TaskComment[]>;

	constructor(private taskCommentsService: TaskCommentsService) { }

	ngOnInit(): void {
		this.taskComments$ = this.taskCommentsService.getUpdatedComments()
			.pipe(map(comments => comments ? comments.sort((c1, c2) => +c2.date - +c1.date) : null));
	}
}
