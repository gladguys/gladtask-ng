import { BaseModel } from './base.model';

export class User extends BaseModel {
	public username: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
	public profileEnum: string;
	public profilePhoto: string;
	public creationDate: string;

}
