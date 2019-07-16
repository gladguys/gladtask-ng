import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Invitation } from 'src/app/shared/models/invitation.model';
import { environment } from "../../../environments/environment";
import { InvitationDTO } from 'src/app/shared/models/dtos/invitation-dto';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root'
})
export class InvitationService extends BaseService<Invitation> {

	constructor(protected injector:Injector,
				protected http: HttpClient) {
		super(injector, "/invitation");
	}

	createOrUpdateByDTO(invitation: InvitationDTO): Observable<Invitation> {
		if (invitation.id != null && invitation.id != '') {
			return this.http.put<Invitation>(`${environment.API}/invitation`, invitation);
		} else {
			return this.http.post<Invitation>(`${environment.API}/invitation`, invitation);
		}
	}

	findAllByUser(userId: string): Observable<Invitation[]> {
		return this.http.get<Invitation[]>(`${environment.API}/invitation/user-receiver/${userId}`);
    }
}