import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { TaskService } from "../../../core/services/task.service";
import { SharedModule } from "../../../shared/shared.module";
import { CoreModule } from "../../../core/core.module";

describe('TaskFormComponent', () => {
	let component: TaskFormComponent;
	let fixture: ComponentFixture<TaskFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			],
			providers: [TaskService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.ngOnInit();
	});

	it('Task form invalid when empty', () => {
		expect(component.taskForm.valid).toBeFalsy();
	});

	it('Task form title valid', () => {
		let title = component.taskForm.controls['title'];
		expect(title.valid).toBeFalsy();
		title.setValue("a title");
		fixture.detectChanges();
		expect(title.valid).toBeTruthy();
	});

	it('Task form priority valid', () => {
		let priority = component.taskForm.controls['priority'];
		expect(priority.valid).toBeFalsy();
		priority.setValue("val");
		fixture.detectChanges();
		expect(priority.valid).toBeTruthy();
	});

	it('Task form description valid', () => {
		let description = component.taskForm.controls['description'];
		expect(description.valid).toBeFalsy();
		description.setValue("a description");
		fixture.detectChanges();
		expect(description.valid).toBeTruthy();
	});
});
