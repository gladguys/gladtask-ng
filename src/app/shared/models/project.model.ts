import { User } from "./user.model";
import { Team } from './team.model';
import { BaseModel } from './base.model';

export class Project extends BaseModel {
	public name: string;
	public description: string;
	public manager: User;
	public team: Team;
	public creationDate;
	public participants: Array<User>;
	public projectImage;
}
