
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../../../shared/models/project.model";
import { Task } from "../../../shared/models/task.model";
import { ProjectService } from 'src/app/core/services/project.service';
@Component({
	templateUrl: './project-info.component.html',
	styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
	project: Project;
	projectTasks: Task[] = [];
	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private projectService: ProjectService) {}
	ngOnInit(): void {
		let projectId = this.activatedRoute.snapshot.params['projectId'];
		if(projectId) {
			this.projectService.findById(projectId).subscribe(p => {
				this.project = p;
				console.log(this.project);
			})
		}
	}
}
