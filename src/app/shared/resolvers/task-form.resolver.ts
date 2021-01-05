import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TaskService } from '../../core/services/task.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskFormResolver implements Resolve<Observable<Task>> {
  constructor(private taskService: TaskService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Task> {
    let id = route.params['id'];
    return this.taskService.findById(id);
  }
}
