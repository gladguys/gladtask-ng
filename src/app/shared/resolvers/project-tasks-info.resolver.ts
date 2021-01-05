import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskService } from '../../core/services/task.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectTasksInfoResolver implements Resolve<Observable<Task[]>> {
  constructor(private taskService: TaskService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Observable<Task[]>>
    | Promise<Observable<Task[]>>
    | Observable<Task[]> {
    let projectId = route.params['projectId'];
    return this.taskService.findTasksByProject(projectId);
  }
}
