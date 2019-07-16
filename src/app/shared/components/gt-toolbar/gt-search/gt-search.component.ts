import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';
import { User } from '../../../models/user.model';

import { UserService } from '../../../../core/services/user.service';
import { TaskService } from '../../../../core/services/task.service';
import { ProjectService } from '../../../../core/services/project.service';
import { ProjectRoutingNames } from 'src/app/pages/project/project-routing-names';

@Component({
  selector: 'gt-search',
  templateUrl: './gt-search.component.html',
  styleUrls: ['./gt-search.component.scss']
})
export class GTSearchComponent {

	users: User[] = [];
	tasks: Task[] = [];
	projects: Project[] = [];
	showSearch: Boolean = false;

	@ViewChild('searchInput') searchInput: ElementRef;

	constructor(
		private router: Router,
		private userService: UserService,
	    private taskService: TaskService,
	    private projectService: ProjectService) { }

	search(event) {
		let term: string = this.searchInput.nativeElement.value;
		if (term == '' || term.length < 4) {
			this.resetLists();
		} else {
			this.userService.findByFirstNameLikeOrLastNameLikeAllIgnoreCase(term).subscribe(users => this.users = users);
			this.projectService.findByNameLikeAllIgnoreCase(term).subscribe(projects => this.projects = projects);
			this.taskService.findByTitleOrDescriptionLikeAllIgnoreCase(term).subscribe(tasks => this.tasks = tasks);
		}
	}

	resetLists() {
		this.users = [];
		this.tasks = [];
		this.projects = [];
	}

	goToTask(task: Task) {
		this.resetLists();
		this.searchInput.nativeElement.value = '';
		this.router.navigate(['tasks/task-form', task._id]);
	}

	goToUser(user: User) {
		this.resetLists();
		this.searchInput.nativeElement.value = '';
		this.router.navigate(['users/user-info', user._id]);
	}

	goToProject(project: Project) {
		this.resetLists();
		this.searchInput.nativeElement.value = '';
		this.router.navigate([ProjectRoutingNames.PROJECT_FORM, project._id]);
	}

	toggleSearch() {
		this.showSearch = !this.showSearch;
		this.searchInput.nativeElement.focus();
	}
}
