import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgSelectModule } from "@ng-select/ng-select";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { ProjectService } from '../../core/services/project.service';
import { ProjectFormComponent } from './project-form/project-form.component';
import { UserProjectDashboardComponent } from './user-project-dashboard/user-project-dashboard.component';
import { ProjectRoutingModule } from "./project-routing.module";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { ProjectInfoComponent } from "./project-info/project-info.component";
import { TaskGridModule } from "../task/task-grid/task-grid.module";
import { KanbanModule } from '../kanban/kanban.module';

@NgModule({
	declarations: [
		ProjectFormComponent,
		ProjectInfoComponent,
		UserProjectDashboardComponent
	],
	imports: [
		ProjectRoutingModule,
		FlexLayoutModule,
		NgSelectModule,
		FontAwesomeModule,
		TaskGridModule,
		CoreModule,
		SharedModule,
		KanbanModule
	],
	exports: [UserProjectDashboardComponent],
	providers: [ProjectService]
})
export class ProjectModule {

	constructor() {
		library.add(faCamera);
	}
}
