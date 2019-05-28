import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Project } from "../../../shared/models/project.model";
import { ProjectService } from "../../../core/services/project.service";
import { GTNotificationService } from "../../../core/services/gt-notification.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	templateUrl: './quick-project-form.component.html',
	styleUrls: ['./quick-project-form.component.scss']
})
export  class QuickProjectFormComponent implements OnInit {

	projectForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private projectService: ProjectService,
		private notificationService: GTNotificationService,
		public dialogRef: MatDialogRef<QuickProjectFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit(): void {
		this.projectForm = this.formBuilder.group({
			'name': ['', [Validators.required]],
			'team': [this.data['team'], [Validators.required]]
		});
	}

	onSubmit(): void {
		const project = this.projectForm.getRawValue() as Project;

		this.projectService.createOrUpdate(project)
			.subscribe(savedProject => {
				this.notificationService.notificateSuccess('Projeto criado');
				this.dialogRef.close(savedProject);
			});
	}
}

