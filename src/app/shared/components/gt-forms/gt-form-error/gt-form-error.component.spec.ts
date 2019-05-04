import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GTFormErrorComponent } from './gt-form-error.component';
import { SharedModule } from "../../../shared.module";
import { CoreModule } from "../../../../core/core.module";

describe('GTFormErrorComponent', () => {
	let component: GTFormErrorComponent;
	let fixture: ComponentFixture<GTFormErrorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GTFormErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
