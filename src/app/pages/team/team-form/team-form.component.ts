import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { Team } from 'src/app/shared/models/team.model';

import { GladService } from 'src/app/core/services/glad.service';
import { TeamService } from '../../../core/services/team.service';
import { GTNotificationService } from 'src/app/core/services/gt-notification.service';
import { UserService } from '../../../core/services/user.service';
import { SharedService } from "../../../core/services/shared.service";

@Component({
	templateUrl: './team-form.component.html',
	styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
	team: Team = new Team();
	teamForm: FormGroup;
	teamExists: boolean = false;
	possibleParticipants: Array<User>;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private gladService: GladService,
		private notificationService: GTNotificationService,
		private teamService: TeamService,
		private userService: UserService,
		private sharedService: SharedService) { }

	ngOnInit() {
		this.teamForm = this.formBuilder.group({
			'name': ['', [Validators.required]],
			'manager': [''],
			'participants': ['']
		});

		let id: string = this.route.snapshot.params['id'];
		if (id != undefined) {
			this.teamService.findById(id).subscribe(team => {
				this.teamExists = true;
				this.team = team;
				this.populateForm(this.team);
				this.userService.findAllByTeam(id).subscribe(users => this.possibleParticipants = users);
			}, e => this.router.navigate(['/team-not-found']));
		} else {
			this.teamExists = false;
		}
	}

	compareUser(x: User, y: User): boolean {
		return x && y ? x.id === y.id : x === y;
	}

	onSubmit(): void {
		let isEdit = this.team.id != undefined;
		const submittedTeam = this.teamForm.getRawValue() as Team;

		if(isEdit) {
			submittedTeam.id = this.team.id;
		} else {
			submittedTeam.manager = this.sharedService.getUserLogged();
			submittedTeam.participants = [];
		}

		this.teamService.createOrUpdate(submittedTeam).subscribe(team => {
			if (this.team.id != null) {
				this.gladService.openSnack("Equipe editada");
				this.teamForm.markAsPristine();
			} else {
				this.gladService.openSnack("Equipe criada");
			}
			this.teamService.updateMyTeams(this.sharedService.getUserLogged().id);
			this.router.navigate(['/teams', team.id]);
		}, e => this.notificationService.notificateFailure("Falha ao criar equpe"));
	}

	private populateForm(team: Team) {
		this.teamForm.patchValue({
			name: team.name
		});
	}

	isDirty(): boolean {
		return this.teamForm.dirty;
	}
}
