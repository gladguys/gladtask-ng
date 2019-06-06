import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserListComponent } from "./user-list/user-list.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { UserListResolver } from "../../shared/resolvers/user-list.resolver";
import { UserRoutingNames } from './user-routing-names';

const routes: Routes = [
	{
		path: UserRoutingNames.USERS,
		children:[
			{
				path: '',
				component: UserListComponent,
				canActivate: [AuthGuard],
				resolve: {users: UserListResolver},
				data: { title:'Usuários' }
			},
			{
				path: `${UserRoutingNames.INFO}/:id`,
				component: UserInfoComponent,
				canActivate: [AuthGuard],
				data: { title:'Informação Usuário' }
			}
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule {

}
