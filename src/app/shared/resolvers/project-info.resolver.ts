import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ProjectService } from '../../core/services/project.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectInfoResolver implements Resolve<Observable<Project>> {
  constructor(private projectService: ProjectService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Observable<Project>>
    | Promise<Observable<Project>>
    | Observable<Project> {
    let projectId = route.params['projectId'];
    return this.projectService.findById(projectId);
  }
}
