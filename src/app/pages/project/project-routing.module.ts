import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectFormComponent } from "./project-form/project-form.component";
import { UserProjectDashboardComponent } from "./user-project-dashboard/user-project-dashboard.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { ProjectInfoComponent } from "./project-info/project-info.component";
import { ProjectInfoResolver } from "../../shared/resolvers/project-info.resolver";
import { ProjectTasksInfoResolver } from "../../shared/resolvers/project-tasks-info.resolver";

const routes: Routes = [
	{
		path: 'project-form',
		component: ProjectFormComponent,
		canActivate: [AuthGuard],
		data: { title:'Novo Projeto' }
	},
	{
		path: 'project-form/:id',
		component: ProjectFormComponent,
		canActivate: [AuthGuard],
		data: { title:'Editar Projeto' }
	},
	{
		path: 'project-info/:projectId',
		component: ProjectInfoComponent,
		canActivate: [AuthGuard],
		resolve: { project:  ProjectInfoResolver, tasks: ProjectTasksInfoResolver },
		data: { title:'Informações do Projeto' }
	},
	{
		path: 'project-dashboard/:projectId/:userId',
		component: UserProjectDashboardComponent,
		canActivate: [AuthGuard],
		data: { title:'Projeto' }
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class ProjectRoutingModule {
}
