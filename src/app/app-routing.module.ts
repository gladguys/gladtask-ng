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

	{ path: "tasks", loadChildren: "./pages/task/task.module#TaskModule", canLoad: [AuthGuard] },
	{ path: "users", loadChildren: "./pages/user/user.module#UserModule", canLoad: [AuthGuard] },
	{ path: "teams", loadChildren: "./pages/team/team.module#TeamModule", canLoad: [AuthGuard] },
	{ path: "projects", loadChildren: "./pages/project/project.module#ProjectModule", canLoad: [AuthGuard] },

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
	imports: [RouterModule.forRoot(ROUTES, { enableTracing: !environment.production })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
