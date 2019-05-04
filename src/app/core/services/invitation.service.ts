import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Invitation } from 'src/app/shared/models/invitation.model';
import { environment } from "../../../environments/environment";
import { InvitationDTO } from 'src/app/shared/models/dtos/invitation-dto';

@Injectable({
	providedIn: 'root'
})
export class InvitationService {

	constructor(private http: HttpClient) {}

	createOrUpdate(invitation: InvitationDTO): Observable<Invitation> {
		if (invitation.id != null && invitation.id != '') {
			return this.http.put<Invitation>(`${environment.API}/invitations`, invitation);
		} else {
			return this.http.post<Invitation>(`${environment.API}/invitations`, invitation);
		}
	}

	findAllByUser(userId: string): Observable<Invitation[]> {
		return this.http.get<Invitation[]>(`${environment.API}/invitations/user-receiver/${userId}`);
    }

    findById(id: string): Observable<Invitation> {
		return this.http.get<Invitation>(`${environment.API}/invitations/${id}`);
	}

	delete(id: string) {
		return this.http.delete(`${environment.API}/invitations/${id}`);
	}
}
