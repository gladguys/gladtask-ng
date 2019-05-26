import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KanbanComponent } from './kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TaskModule } from '../task/task.module';

@NgModule({
	declarations: [KanbanComponent],
	imports: [
		FlexLayoutModule,
		CoreModule,
		SharedModule,
		TaskModule,
		DragDropModule
	]
})
export class KanbanModule { }
