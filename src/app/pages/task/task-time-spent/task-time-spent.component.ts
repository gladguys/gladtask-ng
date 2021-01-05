import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TimeSpent } from "../../../shared/models/time-spent.model";

import { TaskService } from "../../../core/services/task.service";
import { SharedService } from "../../../core/services/shared.service";
import { TimeSpentService } from "../task-form/time-spent.service";

@Component({
	selector: 'task-time-spent',
	templateUrl: './task-time-spent.component.html',
	styleUrls: ['./task-time-spent.component.scss']
})
export class TaskTimeSpentComponent implements OnInit {
	ngOnInit(): void {
		this.timeSpentForm = this.formBuilder.group({
			'timeSpent': ['', [Validators.required]],
			'date': ['', [Validators.required]]
		});
	}

	hourMinuteMask = [/[0-9]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

	timeSpentForm: FormGroup;
	minDate = Date.now();
	
	constructor(
		private formBuilder: FormBuilder,
		private taskService: TaskService,
		private timeSpentService: TimeSpentService,
		private sharedService: SharedService,
		private bottomSheetRef: MatBottomSheetRef<TaskTimeSpentComponent>,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
	
	computeTimeSpent() {
		let formValues = this.timeSpentForm.getRawValue();
		let taskId = this.data['taskId'];
		let timeSpent = new TimeSpent();

		timeSpent.gladname = this.sharedService.getUserLogged().username;
		timeSpent.firstName = this.sharedService.getUserLogged().firstName;
		timeSpent.lastName = this.sharedService.getUserLogged().lastName;
		timeSpent.minutesSpent = this.calculateMinutes(formValues.timeSpent);
		timeSpent.date = formValues.date;
		
		this.taskService.saveTimeSpent(taskId, timeSpent, true).subscribe(() => {
			this.timeSpentService.emitTimeSpent(timeSpent);
			this.bottomSheetRef.dismiss();
		});
	}

	calculateMinutes(timeSpent: string) {
		let hours = timeSpent.split(':')[0];
		let minutes = timeSpent.split(':')[1];
		
		return +(+hours*60) + (+minutes);
	}
}