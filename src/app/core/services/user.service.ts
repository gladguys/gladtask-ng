import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from "../../shared/models/user.model";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	createOrUpdate(user: User, teamId: string): Observable<User> {
		if (user.id != null && user.id != '') {
			return this.http.put<User>(`${environment.API}/users`, user);
		} else {
			user.id = null;
			return this.http.post<User>(`${environment.API}/users`, { user, teamId });
		}
	}
	
	findById(id: string): Observable<User> {
		return this.http.get<User>(`${environment.API}/users/${id}`);
	}

	findByUsername(username: string): Observable<User> {
		return this.http.get<User>(`${environment.API}/users/username/${username}`);
	}

	findByEmail(email: string): Observable<User> {
		return this.http.get<User>(`${environment.API}/users/email/${email}/`);
	}

	findAll(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.API}/users`);
	}

	findAllByTeam(teamId: string): Observable<User[]> {
		return this.http.get<User[]>(`${environment.API}/users?teamId=${teamId}`);
	}

	delete(id: string) {
		return this.http.delete(`${environment.API}/users/${id}`);
	}

	findByFirstNameLikeOrLastNameLikeAllIgnoreCase(term: string): Observable<User[]> {
		return this.http.get<User[]>(`${environment.API}/users/term/${term}`);
	}

	findByAnyTerm(term: string): Observable<User[]> {
		return this.http.get<User[]>(`${environment.API}/users/any/${term}`);
	}
}
