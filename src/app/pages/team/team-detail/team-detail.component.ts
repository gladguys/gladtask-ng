import { InvitationDTO } from './../../../shared/models/dtos/invitation-dto';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../core/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { GTNotificationService } from 'src/app/shared/components/gt-notification/gt-notification.service';
import { InvitationService } from 'src/app/core/services/invitation.service';
import { Invitation } from 'src/app/shared/models/invitation.model';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

	team: Team = new Team();
	textSearchParticipant: FormControl;
	showAddParticipant: boolean = false;
	filteredParticipants: Array<User> = [];

	constructor(
		private teamService: TeamService,
		private route: ActivatedRoute,
		private userService: UserService,
		private gtNotification: GTNotificationService,
		private invitationService: InvitationService,
		private sharedService: SharedService,
		private notificationService: GTNotificationService,
		private router: Router) { }

	ngOnInit() {
		this.textSearchParticipant = new FormControl();

		this.textSearchParticipant.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
			.subscribe(term => {
				this.userService.findByAnyTerm(term).subscribe(users =>
					this.filteredParticipants = this.getPossibleUsers(users));
			});
		
		let teamId: string = this.route.snapshot.params['id'];
		if (teamId != undefined) {
			this.teamService.findById(teamId).subscribe(team => this.team = team);
		}
	}

	getPossibleUsers(users: User[]) {
		return users.filter(u => !this.team.participants.map(p => p.email).includes(u.email));
	}

	addUserToTeam(user: User) {
		if (!this.team.participants.map(p => p.email).includes(user.email)){
			let invitation = new InvitationDTO();
			invitation.authorUserId = this.sharedService.getUserLogged().id;
			invitation.receiverUserId = user.id;
			invitation.teamId = this.team.id;

			this.invitationService
							.createOrUpdate(invitation)
							.subscribe( invitation => {
								this.notificationService.notificateSuccess(`convite enviado para usuario ${invitation.receiver.username}`);
							});
			
    }
	}
	
	buildInvitationToUser(user: User): Invitation {
		let invitation = new Invitation();
			invitation.author = this.sharedService.getUserLogged();
			invitation.receiver = user;
			invitation.team = this.team;
			return invitation;
	}
}
