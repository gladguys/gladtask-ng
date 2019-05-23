import { Injectable } from "@angular/core";

import { Team } from "../../shared/models/team.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class TeamProjectService {
	team$: BehaviorSubject<Team> = new BehaviorSubject(null);

	emitTeam(team: Team) {
		this.team$.next(team);
	}

	getTeam(): Observable<Team> {
		return this.team$.asObservable();
	}
}