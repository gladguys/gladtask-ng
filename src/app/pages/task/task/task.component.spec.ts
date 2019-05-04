import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';

import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';

describe('TaskComponent', () => {
	let component: TaskComponent;
	let fixture: ComponentFixture<TaskComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
