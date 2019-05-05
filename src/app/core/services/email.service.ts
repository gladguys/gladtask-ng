import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class EmailService {
	
	constructor(private http: HttpClient) { }
	
	sendInviteToTeamEmail(email: string, url: string): Observable<any> {
		return this.http.post<any>(`${environment.API}/email/inviteTeam/${email}`, url);
	}
}
