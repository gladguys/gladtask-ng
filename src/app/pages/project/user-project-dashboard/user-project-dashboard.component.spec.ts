import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectDashboardComponent } from './user-project-dashboard.component';
import { ProjectService } from "../../../core/services/project.service";
import { SharedModule } from "../../../shared/shared.module";
import { CoreModule } from "../../../core/core.module";

describe('UserProjectDashboardComponent', () => {
  let component: UserProjectDashboardComponent;
  let fixture: ComponentFixture<UserProjectDashboardComponent>;

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
		fixture = TestBed.createComponent(UserProjectDashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
