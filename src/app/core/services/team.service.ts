import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Team } from 'src/app/shared/models/team.model';
import { environment } from "../../../environments/environment";
import { InvitationDTO } from 'src/app/shared/models/dtos/invitation-dto';

@Injectable({
	providedIn: 'root'
})
export class TeamService {

	myTeams: BehaviorSubject<Array<Team>> = new BehaviorSubject<Array<Team>>(null);

	constructor(private http: HttpClient) {}

	createOrUpdate(team: Team): Observable<Team> {
		if (team.id != null && team.id != '') {
			return this.http.put<Team>(`${environment.API}/teams`, team);
		} else {
			return this.http.post<Team>(`${environment.API}/teams`, team);
		}
	}

	findAllByUser(userId: string): Observable<Team[]> {
		return this.http.get<Team[]>(`${environment.API}/teams/user/${userId}`);
    }

    findById(id: string): Observable<Team> {
		return this.http.get<Team>(`${environment.API}/teams/${id}`);
	}

	addUserToTeam(invitationDTO: InvitationDTO) {
		return this.http.post(`${environment.API}/teams/add-user`, invitationDTO);
	}

	updateMyTeams(userId: string) {
		this.findAllByUser(userId).subscribe( teams => {
			this.myTeams.next(teams);
		});
	}
}
