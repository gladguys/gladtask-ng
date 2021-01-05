import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Invitation } from 'src/app/shared/models/invitation.model';
import { environment } from '../../../environments/environment';
import { InvitationDTO } from 'src/app/shared/models/dtos/invitation-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class InvitationService extends BaseService<Invitation> {
  constructor(protected injector: Injector, protected http: HttpClient) {
    super(injector, '/invitations');
  }

  createOrUpdateByDTO(invitation: Invitation): Observable<Invitation> {
    if (invitation._id != null && invitation._id != '') {
      return this.http.put<Invitation>(
        `${environment.API}/invitations`,
        invitation
      );
    } else {
      return this.http.post<Invitation>(
        `${environment.API}/invitations`,
        invitation
      );
    }
  }

  findAllByUser(userId: string): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(
      `${environment.API}/invitations/user-receiver/${userId}`
    );
  }
}
