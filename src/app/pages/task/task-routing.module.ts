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
import { TaskRoutingNames } from './task-routing-names';

const routes: Routes = [
	{
		path: TaskRoutingNames.TASKS,
		children: [
			{
				path: '',
				component: TaskListComponent,
				canActivate: [AuthGuard],
				resolve: {tasksToMe: TaskListToMeResolver},
				data: { title:'Tasks' }
			},
			{
				path: `${TaskRoutingNames.TASK_DETAIL}/:id`,
				component: TaskDetailComponent,
				resolve: { task: TaskFormResolver },
				canActivate: [AuthGuard],
				data: { title:'Detalhe Task' }
			},
			{
				path: TaskRoutingNames.TASK_NOT_FOUND,
				component: TaskNotFoundComponent,
				canActivate: [AuthGuard],
				data: { title:'Task' }
			},
			{
				path: TaskRoutingNames.TASK_FORM,
				component: TaskFormComponent,
				canActivate: [AuthGuard],
				canDeactivate: [TaskFormGuard],
				data: { title:'Nova Task' }
			},
			{
				path: `${TaskRoutingNames.TASK_FORM}/:id`,
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
