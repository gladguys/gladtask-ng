import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { MatDialog } from "@angular/material";
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { InvitationDTO } from '../../../shared/models/dtos/invitation-dto';

import { TeamService } from '../../../core/services/team.service';
import { UserService } from '../../../core/services/user.service';
import { GTNotificationService } from 'src/app/core/services/gt-notification.service';
import { InvitationService } from 'src/app/core/services/invitation.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { EmailService } from "../../../core/services/email.service";
import { GladService } from "../../../core/services/glad.service";

import { environment } from "../../../../environments/environment";
import { ProjectRoutingNames } from '../../project/project-routing-names';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

	@ViewChild('email') email: ElementRef;

	team: Team = new Team();
	textSearchParticipant: FormControl;
	showAddParticipant: boolean = false;
	filteredParticipants: Array<User> = [];

	projectFormLink = `/${ProjectRoutingNames.PROJECTS}/${ProjectRoutingNames.PROJECT_FORM}`;

	constructor(
		private teamService: TeamService,
		private route: ActivatedRoute,
		private userService: UserService,
		private gtNotification: GTNotificationService,
		private invitationService: InvitationService,
		private sharedService: SharedService,
		private notificationService: GTNotificationService,
		private activatedRoute: ActivatedRoute,
		private gladService: GladService,
		private serializer: UrlSerializer,
		private matDialog: MatDialog,
		private emailService: EmailService,
		private router: Router) { }

	ngOnInit() {
		this.textSearchParticipant = new FormControl();

		this.textSearchParticipant.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
			.subscribe(term => {
				this.userService.findByAnyTerm(term).subscribe(users =>
					this.filteredParticipants = this.getPossibleUsers(users));
			});

		this.route.params.subscribe(params => this.teamService.findById(params.id).subscribe(team => this.team = team));
	}

	getPossibleUsers(users: User[]) {
		return users.filter(u => !this.team.participants.map(p => p.email).includes(u.email));
	}

	addUserToTeam(user: User) {
		if (!this.team.participants.map(p => p.email).includes(user.email)) {
			let invitation = new InvitationDTO();
			invitation.authorUserId = this.sharedService.getUserLogged()._id;
			invitation.receiverUserId = user._id;
			invitation.teamId = this.team._id;

			this.invitationService.createOrUpdateByDTO(invitation).subscribe( invitation => {
				this.notificationService.notificateSuccess(`Convite enviado para usuario ${invitation.receiver.username}`);
			});
        }
	}

	emailValidator(email:string): boolean {
		let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return EMAIL_REGEXP.test(email);
	}

	handleInviteEmail() {
		let email = this.email.nativeElement.value;
		if (this.emailValidator(email)) {
			const tree = this.router.createUrlTree(['signup', this.team._id]);
			let url = environment.API_ADRESS + tree;

			this.emailService.sendInviteToTeamEmail(email, url).subscribe(c => {
				this.email.nativeElement.value = '';
				this.gladService.openSnack('Email enviado ao convidado!');
			});
		} else {
			this.gladService.openSnack('Email inválido');
		}
	}
}
