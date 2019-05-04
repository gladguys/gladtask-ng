import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";

import { TaskService } from '../../core/services/task.service';
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../../core/core.module";

describe('TaskService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			],
			providers: [HttpClient]
		})
		.compileComponents();
	}));

	it('should be created', () => {
		const service: TaskService = TestBed.get(TaskService);
		expect(service).toBeTruthy();
	});
});
