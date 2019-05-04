import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GTNotificationComponent } from './gt-notification.component';

describe('GtNotificationComponent', () => {
	let component: GTNotificationComponent;
	let fixture: ComponentFixture<GTNotificationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ GTNotificationComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GTNotificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
