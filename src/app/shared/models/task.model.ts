import { User } from './user.model';
import { PriorityEnum } from '../enums/PriorityEnum';
import { TaskChange } from './task-change.model';
import { Project } from './project.model';
import { TaskType } from '../enums/task-type.enum';
import { TaskComment } from './task-comment.model';
import { Status } from '../enums/status.enum';
import { TimeSpent } from './time-spent.model';
import { BaseModel } from './base.model';

export class Task extends BaseModel {
  public title: string;
  public status: Status;
  public project: Project;
  public priority: PriorityEnum;
  public image: string;
  public dueDate: string;
  public lastEdited: string;
  public creatorUser: User;
  public targetUser: User;
  public senderUser: User;
  public creationDate: string;
  public description: string;
  public taskType: TaskType;
  public estimatedTime: string;
  public taskChanges: Array<TaskChange> = [];
  public taskComments: Array<TaskComment> = [];
  public timeSpentValues: Array<TimeSpent> = [];
}
