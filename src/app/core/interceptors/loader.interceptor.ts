import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { tap } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

	constructor(private spinner: NgxSpinnerService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.params.has('ignoreLoader')) {
			return next.handle(req);
		}
		this.spinner.show();
		return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
			if (event instanceof HttpResponse) {
				this.onEnd();
			}
		},
	(err: any) => this.onEnd()));
	}

	private onEnd(): void {
		this.spinner.hide();
	}
}
