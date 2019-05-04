import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GTFormSuccessComponent } from './gt-form-success.component';
import { SharedModule } from "../../../shared.module";
import { CoreModule } from "../../../../core/core.module";

describe('GTFormSuccessComponent', () => {
	let component: GTFormSuccessComponent;
	let fixture: ComponentFixture<GTFormSuccessComponent>;

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
		fixture = TestBed.createComponent(GTFormSuccessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
