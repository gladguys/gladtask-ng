import {async, TestBed} from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";

import { ProjectService } from '../../core/services/project.service';
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../../core/core.module";

describe('ProjectService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				CoreModule
			],
			providers: [HttpClient]
		}).compileComponents();
	}));

	it('should be created', () => {
		const service: ProjectService = TestBed.get(ProjectService);
		expect(service).toBeTruthy();
	});
});
