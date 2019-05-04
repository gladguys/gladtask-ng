import { User } from "./user.model";
import { Team } from './team.model';

export class Project {
	public id: string;
	public name: string;
	public description: string;
	public manager: User;
	public team: Team;
	public creationDate;
	public participants: Array<User>;
	public projectImage;
}
