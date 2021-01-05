import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { SharedService } from '../services/shared.service';
import { GladService } from '../services/glad.service';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      const router = this.injector.get(Router);
      const sharedService = this.injector.get(SharedService);
      const gladService = this.injector.get(GladService);

      sharedService.logout();
      router
        .navigate(['/login'])
        .then(() => gladService.openSnack('Sua sessão expirou!'));
    }
  }
}
