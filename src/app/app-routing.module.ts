import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { environment } from '../environments/environment';
import { AuthGuard } from "./core/guards/auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { LoginAuthGuard } from "./core/guards/login.auth.guard";
import { SignupComponent } from "./pages/signup/signup.component";
import { HomeComponent } from "./pages/home/home.component";
import { InboxComponent } from "./pages/inbox/inbox.component";
import { KanbanComponent } from "./pages/kanban/kanban.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { TaskRoutingNames } from './pages/task/task-routing-names';
import { TeamRoutingNames } from './pages/team/team-routing-names';
import { ProjectRoutingNames } from './pages/project/project-routing-names';
import { UserRoutingNames } from './pages/user/user-routing-names';

export const ROUTES: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
		data:
			{
				title:'Gladtask'
			}
	},
	{
		path: 'inbox',
		component: InboxComponent,
		canActivate: [AuthGuard],
		data:
			{
				title:'Inbox'
			}
	},
	{
		path: 'kanban',
		component: KanbanComponent,
		canActivate: [AuthGuard],
		data:
			{
				title:'Kanban'
			}
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoginAuthGuard],
		data:
			{
				title:'Login'
			}
	},
	{
		path: 'signup',
		component: SignupComponent,
		canActivate: [LoginAuthGuard],
		data:
			{
				title:'Registrar'
			}
	},
	{
		path: 'signup/:teamId',
		component: SignupComponent,
		canActivate: [LoginAuthGuard],
		data:
			{
				title:'Registrar'
			}
	},

	{ path: TaskRoutingNames.TASKS , loadChildren: "./pages/task/task.module#TaskModule", canLoad: [AuthGuard] },
	{ path: UserRoutingNames.USERS, loadChildren: "./pages/user/user.module#UserModule", canLoad: [AuthGuard] },
	{ path: TeamRoutingNames.TEAMS, loadChildren: "./pages/team/team.module#TeamModule", canLoad: [AuthGuard] },
	{ path: ProjectRoutingNames.PROJECTS, loadChildren: "./pages/project/project.module#ProjectModule", canLoad: [AuthGuard] },

	{
		path: '**',
		component: PageNotFoundComponent,
		canActivate: [AuthGuard],
		data:
			{
				title:'Página não encontrada'
			}
	}
];

@NgModule({
	imports: [RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' })],
	//imports: [RouterModule.forRoot(ROUTES, { enableTracing: !environment.production })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
