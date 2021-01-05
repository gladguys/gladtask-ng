import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TaskComment } from '../../shared/models/task-comment.model';

@Injectable({
  providedIn: 'root',
})
export class TaskCommentsService {
  commentsSubject: BehaviorSubject<TaskComment[]> = new BehaviorSubject<
    TaskComment[]
  >(null);

  getUpdatedComments(): Observable<TaskComment[]> {
    return this.commentsSubject.asObservable();
  }

  setUpdatedComments(taskComments: TaskComment[]) {
    this.commentsSubject.next(taskComments);
  }
}
