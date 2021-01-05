import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { TaskGridComponent } from './task-grid.component';

@NgModule({
  declarations: [TaskGridComponent],
  imports: [AgGridModule.withComponents([])],
  exports: [TaskGridComponent],
})
export class TaskGridModule {}
