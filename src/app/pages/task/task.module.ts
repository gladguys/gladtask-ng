import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { SidebarModule } from 'ng-sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NguCarouselModule } from "@ngu/carousel";
import {
	faBars, faCircle, faCheck, faExpand, faInfo, faPaperclip,
	faPause, faPlay, faPlus, faThLarge, faEdit, faClock
} from '@fortawesome/free-solid-svg-icons';
import { TextMaskModule } from 'angular2-text-mask';
import { MarkdownModule } from "ngx-markdown";

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { TaskComponent } from './task/task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskNotFoundComponent } from './task/task-not-found/task-not-found.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskChangesComponent } from './task-changes/task-changes.component';
import { TaskCommentsComponent } from './task-comments/task-comments.component';
import { GTTasksCarouselComponent } from "../../shared/components/gt-tasks-carousel/gt-tasks-carousel.component";
import { TaskListCardViewComponent } from "./task-list/task-list-card-view/task-list-card-view.component";
import { TaskListGridViewComponent } from "./task-list/task-list-grid-view/task-list-grid-view.component";

import { TaskRoutingModule } from './task-routing.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TaskGridModule } from "./task-grid/task-grid.module";
import { TaskTimeSpentComponent } from "./task-time-spent/task-time-spent.component";
import { TaskTimesComponent } from "./task-times/task-times.component";


@NgModule({
	declarations: [
		TaskComponent,
		TaskFormComponent,
		TaskListComponent,
		TaskPreviewComponent,
		TaskDetailComponent,
		TaskChangesComponent,
		TaskCommentsComponent,
		TaskNotFoundComponent,
		TaskCardComponent,
		TaskListCardViewComponent,
		TaskListGridViewComponent,
		TaskTimeSpentComponent,
		TaskTimesComponent,
		GTTasksCarouselComponent
    ],
	imports: [
		TaskRoutingModule,
		FlexLayoutModule,
		FontAwesomeModule,
		NgSelectModule,
		SidebarModule.forRoot(),
		MatTooltipModule,
		TextMaskModule,
		CoreModule,
		SharedModule,
		TaskGridModule,
		MarkdownModule.forRoot(),
		NguCarouselModule
    ],
	entryComponents: [TaskTimeSpentComponent],
	exports: [
		TaskComponent,
		TaskFormComponent,
		TaskListComponent,
		TaskPreviewComponent,
		TaskCardComponent
	]
})
export class TaskModule {

	constructor() {
		library.add(faBars, faCircle, faCheck, faExpand, faInfo, faPaperclip, faPause, faPlay, faPlus, faThLarge, faEdit, faClock);
	}
}
