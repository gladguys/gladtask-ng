import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class GladService {
  constructor(public snackBar: MatSnackBar) {}

  openSnack(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  openDefaultErrorSnack() {
    this.snackBar.open('Algo inesperado ocorreu', '', {
      duration: 2000,
    });
  }

  getIgnoreLoaderParam(ignoreLoader: boolean): {} {
    if (ignoreLoader) {
      let params = {
        ignoreLoader: 'true',
      };
      return { params: params };
    }
    return {};
  }
}
