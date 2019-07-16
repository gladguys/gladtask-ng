import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Team } from 'src/app/shared/models/team.model';
import { environment } from "../../../environments/environment";
import { InvitationDTO } from 'src/app/shared/models/dtos/invitation-dto';
import { BaseService } from './base.service';

import { CacheBuster, Cacheable } from 'ngx-cacheable';

const cacheBuster$ = new Subject<void>();

@Injectable({
	providedIn: 'root'
})
export class TeamService extends BaseService<Team> {

	myTeams: BehaviorSubject<Array<Team>> = new BehaviorSubject<Array<Team>>(null);

	constructor(protected http: HttpClient,
		protected injector: Injector) {
		super(injector, "/team");
	}

	@CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
	createOrUpdate(t: Team): Observable<Team> {
		if (t._id != null && t._id != '') {
			return this.http.put<Team>(environment.API + this.pathToApi, t);
		} else {
			return this.http.post<Team>(environment.API + this.pathToApi, t);
		}
	}

	@Cacheable({
    cacheBusterObserver: cacheBuster$
  })
	findAllByUser(userId: string): Observable<Team[]> {
		return this.http.get<Team[]>(`${environment.API}/team/user/${userId}`);
	}

	@CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
	addUserToTeam(invitationDTO: InvitationDTO) {
		return this.http.post(`${environment.API}/team/add-user`, invitationDTO);
	}

	updateMyTeams(userId: string) {
		this.findAllByUser(userId).subscribe(teams => {
			this.myTeams.next(teams);
		});
	}
}
