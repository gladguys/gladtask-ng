import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KanbanComponent } from './kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TaskModule } from '../task/task.module';

@NgModule({
	declarations: [KanbanComponent],
	imports: [
		FlexLayoutModule,
		FontAwesomeModule,
		CoreModule,
		SharedModule,
		TaskModule,
		DragDropModule
	],
	exports: [
		KanbanComponent
	]
})
export class KanbanModule {
	constructor() {
		library.add(faExpand);
	}
}
