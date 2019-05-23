import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from "@angular/material";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";
import { LoginAuthGuard } from "./guards/login.auth.guard";
import { TaskFormGuard } from "./guards/task-form.guard";

import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ProfilerInterceptor } from "./interceptors/profiler.interceptor";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { AuthErrorHandler } from "./errors-handlers/auth-error-handler";

@NgModule({
	imports: [RouterModule],
	exports: [RouterModule],
	providers: [
		LoginAuthGuard,
		AuthGuard,
		TaskFormGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoaderInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ProfilerInterceptor,
			multi: true
		},
		{
			provide: ErrorHandler,
			useClass: AuthErrorHandler
		},
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
	]
})
export class CoreModule {
}
