import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GTDatatableComponent } from './gt-datatable.component';
import { CoreModule } from "../../../core/core.module";
import { SharedModule } from "../../shared.module";

describe('GTDatatableComponent', () => {
	let component: GTDatatableComponent;
	let fixture: ComponentFixture<GTDatatableComponent>;

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
		fixture = TestBed.createComponent(GTDatatableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
