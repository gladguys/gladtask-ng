import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GTNotificationService {
  constructor(private toastr: ToastrService) {}

  notificateSuccess(message: string) {
    this.toastr.success(message, '', {
      positionClass: 'toast-top-center',
    });
  }

  notificateFailure(message: string) {
    this.toastr.error(message, '', {
      positionClass: 'toast-top-center',
    });
  }

  notificateInfo(message: string) {
    this.toastr.info(message, '', {
      positionClass: 'toast-top-center',
    });
  }

  notificateWarning(message: string) {
    this.toastr.warning(message, '', {
      positionClass: 'toast-top-center',
    });
  }
}
