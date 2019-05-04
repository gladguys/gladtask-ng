import { User } from './user.model';
import { Team } from './team.model';

export class Invitation {
    public id: string;
    public author: User;
    public receiver: User;
    public team: Team;
    public isActive: boolean;
}