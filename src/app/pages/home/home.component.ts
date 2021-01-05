import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../core/services/user.service';
import { TeamService } from '../../core/services/team.service';
import { Team } from 'src/app/shared/models/team.model';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userTeams$: Observable<Team[]>;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userTeams$ = this.teamService.findAllByUser(
      this.sharedService.getUserLogged()._id
    );
  }
}
