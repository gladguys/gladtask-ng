
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../../../shared/models/project.model";
import { Task } from "../../../shared/models/task.model";
import { ProjectService } from 'src/app/core/services/project.service';
import { TaskService } from 'src/app/core/services/task.service';
@Component({
	templateUrl: './project-info.component.html',
	styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
	project: Project;
	projectTasks: Task[] = [];
	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private taskService: TaskService,
				private projectService: ProjectService) {}

	//TODO muito estranho isso, tem um resolver que já faz a request e carrega o projeto. Isso aqui é sono do Bala
	ngOnInit(): void {
		let projectId = this.activatedRoute.snapshot.params['projectId'];
		if (projectId) {
			this.projectService.findById(projectId).subscribe(p => {
				this.project = p;
				this.taskService.findTasksByProject(this.project._id).subscribe(tasks => this.projectTasks = tasks);
			})
		}
	}
}
