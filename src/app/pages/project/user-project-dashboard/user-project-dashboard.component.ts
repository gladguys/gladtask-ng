import { ProjectService } from '../../../core/services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Project } from 'src/app/shared/models/project.model';
import { Task } from "../../../shared/models/task.model";
import { SharedService } from "../../../core/services/shared.service";
import {Observable} from "rxjs";
import { ProjectRoutingNames } from '../project-routing-names';

@Component({
  selector: 'user-project-dashboard',
  templateUrl: './user-project-dashboard.component.html',
  styleUrls: ['./user-project-dashboard.component.scss']
})
export class UserProjectDashboardComponent implements OnInit {

	tasks: Array<Task>;
	projects$: Observable<Project[]>;

	constructor(
		private activateRoute: ActivatedRoute,
		private projectService: ProjectService,
		private sharedService: SharedService) { }

	ngOnInit() {
		let userId = this.sharedService.getUserLogged()._id;
		this.projects$ = this.projectService.getRecentProjectsByUserId(userId);
	}

	goToInfoProject(id: string): string {
		return `${ProjectRoutingNames.PROJECTS}/${ProjectRoutingNames.PROJECT_INFO}/${id}`;
	}
}
