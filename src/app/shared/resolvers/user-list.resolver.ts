import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../core/services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserListResolver implements Resolve<Observable<User[]>> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.userService.findAll() as any;
  }
}
