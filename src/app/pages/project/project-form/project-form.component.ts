import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from "../../../core/services/user.service";
import { ProjectService } from "../../../core/services/project.service";
import { TeamService } from '../../../core/services/team.service';
import { GladService } from "../../../core/services/glad.service";
import { GTNotificationService } from "../../../core/services/gt-notification.service";
import { SharedService } from "../../../core/services/shared.service";

import { Project } from "../../../shared/models/project.model";
import { Team } from "../../../shared/models/team.model";
import { GTConstants } from "../../../GT-constants";

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

	project: Project = new Project();
	previewImage: any;
	projectForm: FormGroup;
	possibleTeams$: Observable<Team[]>;
	projectExists: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private gladService: GladService,
		private projectService: ProjectService,
		private notificationService: GTNotificationService,
		private router: Router,
		private route: ActivatedRoute,
		private teamService: TeamService,
		private sharedService: SharedService) { }

	ngOnInit() {
		this.possibleTeams$ = this.teamService.findAllByUser(this.sharedService.getUserLogged().id);

		this.projectForm = this.formBuilder.group({
			'name': ['', [Validators.required]],
			'description': [''],
			'team': ['', Validators.required]
		});

		let id: string = this.route.snapshot.params['id'];
		if (id != undefined) {
			this.projectService.findById(id).subscribe(project => {
				this.projectExists = true;
				this.project = project;
				this.populateForm(this.project);
			}, e => this.router.navigate(['/task-not-found']));
		} else {
			this.previewImage = GTConstants.GLADIATOR_DEFAULT_PROFILE;
			this.projectExists = true;
		}
	}

	onSubmit(): void {
		const submittedProject = this.projectForm.getRawValue() as Project;
		submittedProject.id = this.project.id;
		if (this.previewImage != null) {
			submittedProject.projectImage = this.previewImage;
		}
		this.projectService.createOrUpdate(submittedProject)
			.subscribe(project => {
				if (this.project.id != null) {
					this.gladService.openSnack("Projeto editado");
				} else {
					this.gladService.openSnack("Projeto criado");
				}
				this.router.navigate(['/']);
			}, e => this.notificationService.notificateFailure("Falha ao criar projeto"));
	}

	showPreviewImage(files) {
		if (files.length === 0)
			return;

		let mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (e) => this.previewImage = reader.result;
	}

	private populateForm(project: Project) {
		this.projectForm.patchValue({
			name: project.name,
			description: project.description,
			manager: project.manager,
			team: project.team,
			participants: project.participants
		});
		this.previewImage = project.projectImage;
	}
}
