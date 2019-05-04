import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";

import { UserService } from '../../core/services/user.service';
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../../core/core.module";

describe('UserService', () => {
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
		const service: UserService = TestBed.get(UserService);
		expect(service).toBeTruthy();
	});
});
