import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TaskListComponent } from "./task-list/task-list.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskNotFoundComponent } from "./task/task-not-found/task-not-found.component";
import { TaskFormComponent } from "./task-form/task-form.component";

import { AuthGuard } from "../../core/guards/auth.guard";
import { TaskFormGuard } from "../../core/guards/task-form.guard";

import { TaskListToMeResolver } from "../../shared/resolvers/task-list-to-me.resolver";
import { TaskFormResolver } from "../../shared/resolvers/task-form.resolver";

const routes: Routes = [
	{
		path: 'tasks',
		children: [
			{
				path: '',
				component: TaskListComponent,
				canActivate: [AuthGuard],
				resolve: {tasksToMe: TaskListToMeResolver},
				data: { title:'Tasks' }
			},
			{
				path: 'task-detail/:id',
				component: TaskDetailComponent,
				resolve: { task: TaskFormResolver },
				canActivate: [AuthGuard],
				data: { title:'Detalhe Task' }
			},
			{
				path: 'task-not-found',
				component: TaskNotFoundComponent,
				canActivate: [AuthGuard],
				data: { title:'Task' }
			},
			{
				path: 'task-form',
				component: TaskFormComponent,
				canActivate: [AuthGuard],
				canDeactivate: [TaskFormGuard],
				data: { title:'Nova Task' }
			},
			{
				path: 'task-form/:id',
				component: TaskFormComponent,
				resolve: { task: TaskFormResolver },
				canActivate: [AuthGuard],
				data: { title:'Editar Task' }
			}
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class TaskRoutingModule {

}
