import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPreviewComponent } from './task-preview.component';
import { SharedModule } from "../../../shared/shared.module";
import { CoreModule } from "../../../core/core.module";
import { Task } from "../../../shared/models/task.model";

describe('TaskPreviewComponent', () => {
	let component: TaskPreviewComponent;
	let fixture: ComponentFixture<TaskPreviewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskPreviewComponent);
		component = fixture.componentInstance;

		let mockTask = new Task();
		mockTask.id = "1";
		mockTask.title = "Gladtask";
		component.task = mockTask;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
