import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendInviteToTeamEmail(email: string, url: string): Observable<any> {
    return this.http.post<any>(
      `${environment.API}/emails/inviteTeam/${email}`,
      { url }
    );
  }
}
