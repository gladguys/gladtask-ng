import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class ProfilerInterceptor implements HttpInterceptor {

	started: number;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.started = Date.now();
		return next.handle(req).pipe(
			finalize(() => {
				const elapsed = Date.now() - this.started;
				console.log(`%c${req.method} %cto %c${req.urlWithParams} %ctook %c${elapsed} ms.`,
					"color: green", "color: black", "color: blue", "color: black", "color: #ffcc00");
			})
		);
	}
}
