import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../../shared/models/project.model';
import { environment } from '../../../environments/environment';
import { GladService } from './glad.service';
import { BaseService } from './base.service';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    protected http: HttpClient,
    protected gladService: GladService,
    protected injector: Injector
  ) {
    super(injector, '/projects');
  }

  findByParticipants(userId: string) {
    return this.http.get<Project[]>(
      `${environment.API}/projects/user/${userId}`
    );
  }

  findAllByTeam(
    teamId: string,
    ignoreLoader: boolean = false
  ): Observable<Project[]> {
    return this.http.get<Project[]>(
      `${environment.API}/projects/team/${teamId}`,
      this.gladService.getIgnoreLoaderParam(ignoreLoader)
    );
  }

  findByNameLikeAllIgnoreCase(term: string) {
    return this.http.get<Project[]>(`${environment.API}/projects/term/${term}`);
  }

  getRecentProjectsByUserId(userId: string) {
    return this.http.get<Project[]>(
      `${environment.API}/projects/user/${userId}`
    );
  }
}
