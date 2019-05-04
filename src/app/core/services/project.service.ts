import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Project } from "../../shared/models/project.model";
import { environment } from "../../../environments/environment";
import { GladService } from "./glad.service";

@Injectable()
export class ProjectService {

	constructor(
		private http: HttpClient,
		private gladService: GladService) { }

	createOrUpdate(project: Project): Observable<Project> {
		if(project.id != null && project.id != '') {
			return this.http.put<Project>(`${environment.API}/project`, project);
		} else {
			return this.http.post<Project>(`${environment.API}/project`, project);
		}
	}

	findById(id: string): Observable<Project> {
		return this.http.get<Project>(`${environment.API}/project/${id}`);
	}

	findByParticipants(userId: string) {
		return this.http.get<Project[]>(`${environment.API}/project/participant/${userId}`);
	}

	findAll() {
		return this.http.get<Project[]>(`${environment.API}/project`);
	}

	findAllByTeam(teamId: string, ignoreLoader: boolean = false): Observable<Project[]> {
		return this.http.get<Project[]>(`${environment.API}/project/team/${teamId}`,
			this.gladService.getIgnoreLoaderParam(ignoreLoader));
	}

	findByNameLikeAllIgnoreCase(term: string) {
		return this.http.get<Project[]>(`${environment.API}/project/name/${term}`);
	}

	getRecentProjectsByUserId(userId: string) {
		return this.http.get<Project[]>(`${environment.API}/project/user/${userId}`);
	}
}
