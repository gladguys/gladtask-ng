import { User } from './user.model';
import { BaseModel } from './base.model';

export class Team extends BaseModel {
	public name: string;
	public manager: User;
	public participants: Array<User>;
}
