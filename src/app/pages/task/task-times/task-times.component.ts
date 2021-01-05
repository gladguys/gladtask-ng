import { Component } from '@angular/core';

import { TimeSpent } from '../../../shared/models/time-spent.model';

@Component({
  selector: 'gt-task-times',
  templateUrl: './task-times.component.html',
  styleUrls: ['./task-times.component.scss'],
})
export class TaskTimesComponent {
  taskTimes: TimeSpent[] = [];

  constructor() {}

  setTaskTimes(taskTimes: TimeSpent[]) {
    this.taskTimes = taskTimes.sort(
      (d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime()
    );
  }
}
