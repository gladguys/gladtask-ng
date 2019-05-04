import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserListComponent } from './user-list/user-list.component';

import { UserService } from "../../core/services/user.service";
import { UserRoutingModule } from "./user-routing.module";
import { UserInfoComponent } from "./user-info/user-info.component";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	declarations: [
		UserListComponent,
		UserInfoComponent
	],
	imports: [
		UserRoutingModule,
		NgSelectModule,
		MatGridListModule,
		FlexLayoutModule,
		CoreModule,
		SharedModule
	],
	exports: [
		UserListComponent,
		UserInfoComponent
	],
	providers: [UserService]
})
export class UserModule { }
