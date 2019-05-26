import { Component, Input } from '@angular/core';

import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss']
})
export class TaskPreviewComponent {
  @Input() task: Task;

  constructor() { }
}
