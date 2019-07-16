import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from "../../shared/models/user.model";
import { environment } from "../../../environments/environment";
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root'
})
export class UserService extends BaseService<User> {

	constructor(protected http: HttpClient,
				protected injector: Injector) {
		super(injector, "/users");
	 }
	
	createOrUpdateWithTeam(user: User, teamId: string): Observable<User> {
		if (user._id != null && user._id != '') {
			return this.http.put<User>(`${environment.API}/user`, user);
		} else {
			user._id = null;
			return this.http.post<User>(`${environment.API}/user`, { user, teamId });
		}
	}

	findByUsername(username: string): Observable<User> {
		return this.http.get<User>(`${environment.API}/users/username/${username}`);
	}

	findByEmail(email: string): Observable<User> {
		return this.http.get<User>(`${environment.API}/users/email/${email}/`);
	}

	findAllByTeam(teamId: string): Observable<User[]> {
		return this.http.get<User[]>(`${environment.API}/users?teamId=${teamId}`);
	}

	findByFirstNameLikeOrLastNameLikeAllIgnoreCase(term: string): Observable<User[]> {
		return this.http.get<User[]>(`${environment.API}/users/term/${term}`);
	}

	findByAnyTerm(term: string): Observable<User[]> {
		return this.http.get<User[]>(`${environment.API}/users/any/${term}`);
	}
}
