import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { GTNotificationService } from "../services/gt-notification.service";
import { Injectable, Injector } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	
	constructor(private injector: Injector) {
	}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const notificationService = this.injector.get(GTNotificationService);
		
		return next.handle(req).pipe(
			catchError((err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 400) {
						notificationService.notificateFailure('Ocorreu um erro na requisição.')
					} else if (err.status === 400) {
						notificationService.notificateFailure('Ocorreu um erro interno.')
					}
				}
				return of(err);
			}));
		
	}
}