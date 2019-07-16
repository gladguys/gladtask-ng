import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/core/services/team.service';
import { Team } from 'src/app/shared/models/team.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamRoutingNames } from '../team-routing-names';

@Component({
    selector: 'team-list-sidenav',
    templateUrl: './team-list-sidenav.component.html',
    styleUrls: ['./team-list-sidenav.component.scss']
})
export class TeamListSidenavComponent implements OnInit {
    
    myTeams: Observable<Array<Team>> = new Observable();
    
    constructor(
    	private teamService: TeamService,
        private sharedService: SharedService,
        public router: Router) { }

    ngOnInit(): void {
        this.myTeams = this.teamService.myTeams;
        this.teamService.updateMyTeams(this.sharedService.getUserLogged()._id);
    }

    goToTeamInfo(team) {
        this.router.navigate([TeamRoutingNames.TEAMS, team.id]);
    }
}
