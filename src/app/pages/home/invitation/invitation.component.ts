import { GTNotificationService } from 'src/app/core/services/gt-notification.service';
import { InvitationDTO } from 'src/app/shared/models/dtos/invitation-dto';
import { InvitationService } from '../../../core/services/invitation.service';
import { Invitation } from '../../../shared/models/invitation.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/core/services/shared.service';
import { TeamService } from 'src/app/core/services/team.service';
import { TeamRoutingNames } from '../../team/team-routing-names';

@Component({
    selector: 'gt-invitation',
    templateUrl: './invitation.component.html',
    styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

    invitations$: Observable<Invitation[]>;
    constructor(public invitationService: InvitationService,
        public sharedService: SharedService,
        public teamService: TeamService,
        private notificationService: GTNotificationService) { }

    ngOnInit() {
        this.getInvitationsAsObservable();
    }

    getInvitationsAsObservable() {
        this.invitations$ = this.invitationService
            .findAllByUser(this.sharedService.getUserLogged()._id);
    }

    acceptInvitation(invitation: Invitation) {
        let invitationDTO = new InvitationDTO();
        invitationDTO.teamId = invitation.team._id;
        invitationDTO.receiverUserId = invitation.receiver._id;
        invitationDTO.id = invitation._id;

        this.teamService.addUserToTeam(invitationDTO)
            .subscribe(() => {
                this.teamService.updateMyTeams(this.sharedService.getUserLogged()._id);
                this.getInvitationsAsObservable();
                this.notificationService.notificateSuccess("Convite aceito com sucesso");
            });

    }

    denyInvitation(invitation: Invitation) {
        this.invitationService.delete(invitation._id).subscribe(() => {
            this.getInvitationsAsObservable();
            this.notificationService.notificateSuccess("Convite negado.");
        })
    }

    goToTeamDetail(id: string): string {
        return  `/${TeamRoutingNames.TEAMS}/${id}`;
    }
}
