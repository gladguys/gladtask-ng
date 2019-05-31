import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ProjectService } from "../../../core/services/project.service";
import { User } from "../../../shared/models/user.model";
import { Project } from "../../../shared/models/project.model";
import { SharedService } from "../../../core/services/shared.service";
import {Observable} from "rxjs";

@Component({
  selector: 'projects-home',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.scss']
})
export class ProjectsHomeComponent implements OnInit {

	user: User;
	projects$: Observable<Project[]>;

	constructor(
		private projectService: ProjectService,
		private sharedService: SharedService,
		private router: Router) { }

	ngOnInit(): void {
		if (this.sharedService.isUserLoggedIn()) {
			this.user = this.sharedService.getUserLogged();
			this.projects$ = this.projectService.findByParticipants(this.user.id);
		}
	}

	gotoProject(project: Project) {
		this.router.navigate(["/project-dashboard",  project.id,  this.user.id]);
	}
}
