import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { TaskService } from "../../../core/services/task.service";
import { Task } from "../../../shared/models/task.model";
import { SharedService } from "../../../core/services/shared.service";

@Component({
  selector: 'recent-tasks',
  templateUrl: './recent-tasks.component.html',
  styleUrls: ['./recent-tasks.component.scss']
})
export class RecentTasksComponent implements OnInit {

	tasks$: Observable<Task[]>;

	constructor(
		private taskService: TaskService,
		private sharedService: SharedService) {}

	ngOnInit() {
		let userId = this.sharedService.getUserLogged()._id;
		this.tasks$ = this.taskService.findFirst4ByTargetUserIdOrderByLastEdited(userId);
	}
}
