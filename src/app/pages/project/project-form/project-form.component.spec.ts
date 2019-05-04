import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { ProjectService } from "../../../core/services/project.service";
import { SharedModule } from "../../../shared/shared.module";
import { CoreModule } from "../../../core/core.module";

describe('ProjectFormComponent', () => {
	let component: ProjectFormComponent;
	let fixture: ComponentFixture<ProjectFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			],
			providers: [ProjectService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
