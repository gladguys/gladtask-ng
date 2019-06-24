import { ErrorHandler, Inject, Injectable, InjectionToken, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { SharedService } from "../services/shared.service";
import { GladService } from "../services/glad.service";
import * as Rollbar from "rollbar";

const rollbarConfig = {
	accessToken: 'f441fb85568b4474934a681dbfdc77e7',
	captureUncaught: true,
	captureUnhandledRejections: true,
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable()
export class GTErrorHandler implements ErrorHandler {
	
	constructor(private injector: Injector, @Inject(RollbarService) private rollbar: Rollbar) {
	}
	
	handleError(err: any): void {
		if (err instanceof HttpErrorResponse && err.status === 401) {
			const router = this.injector.get(Router);
			const sharedService = this.injector.get(SharedService);
			const gladService = this.injector.get(GladService);
			
			sharedService.logout();
			router.navigate(['/login']).then(() => gladService.openSnack('Sua sessão expirou!'));
		}
		this.rollbar.error(err.originalError || err);
	}
}

export function rollbarFactory() {
	return new Rollbar(rollbarConfig);
}