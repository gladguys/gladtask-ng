import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarModule } from 'ng-sidebar';

import { ProjectModule } from '../project/project.module';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';
import { InboxModule } from '../inbox/inbox.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';
import { TasksPerStatusChartComponent } from './tasks-per-status-chart/tasks-per-status-chart.component';
import { ProjectsHomeComponent } from './projects-home/projects-home.component';
import { DueSoonTasksComponent } from './due-soon-tasks/due-soon-tasks.component';
import { InvitationComponent } from './invitation/invitation.component';

@NgModule({
	declarations: [
		HomeComponent,
		ProjectsHomeComponent,
		TasksPerStatusChartComponent,
		DueSoonTasksComponent,
		InvitationComponent
	],
	imports: [
		FormsModule,
		FlexLayoutModule,
		SidebarModule.forRoot(),
		TaskModule,
		UserModule,
		InboxModule,
		RouterModule,
		ProjectModule,
		CoreModule,
		SharedModule
	],
	exports: [ProjectsHomeComponent]
})
export class HomeModule { }
