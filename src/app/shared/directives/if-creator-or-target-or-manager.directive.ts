import {
  AfterViewInit,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { SharedService } from '../../core/services/shared.service';
import { Task } from '../models/task.model';
import { TaskService } from '../../core/services/task.service';

@Directive({
  selector: '[ifCreatorOrTargetOrManager]',
})
export class IfCreatorOrTargetOrManagerDirective {
  constructor(
    private sharedService: SharedService,
    private taskService: TaskService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set ifCreatorOrTargetOrManager(task) {
    const canEdit = this.taskService.isTaskOwnerOrTargetOrTeamManager(
      task,
      this.sharedService.getUserLogged()._id
    );
    if (canEdit) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
