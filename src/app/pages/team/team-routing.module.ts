import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamFormComponent } from './team-form/team-form.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { AuthGuard } from "../../core/guards/auth.guard";

const routes: Routes = [
	{
		path: '',
		children: [
            {
				path: 'team-form',
				component: TeamFormComponent,
				canActivate: [AuthGuard],
				data: { title:'Nova Equipe' }
			},
			{
				path: 'team-form/:id',
				component: TeamFormComponent,
				canActivate: [AuthGuard],
				data: { title:'Nova Equipe' }
			},
			{
				path: ':id',
				component: TeamDetailComponent,
				canActivate: [AuthGuard],
				data: { title:'Detalhe Equipe' }
			}
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class TeamRoutingModule {

}
