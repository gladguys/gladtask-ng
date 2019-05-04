import { User } from './user.model';

export class Team {
	public id: string;
	public name: string;
	public manager: User;
	public participants: Array<User>;
}
