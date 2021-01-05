import { User } from './user.model';
import { Team } from './team.model';
import { BaseModel } from './base.model';

export class Invitation extends BaseModel {
  public author: User;
  public receiver: User;
  public team: Team;
  public isActive: boolean;
}
