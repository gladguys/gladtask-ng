import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GTToolbarComponent } from './gt-toolbar.component';
import { SharedModule } from '../../shared.module';
import { CoreModule } from '../../../core/core.module';

describe('GTToolbarComponent', () => {
	let component: GTToolbarComponent;
	let fixture: ComponentFixture<GTToolbarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GTToolbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
