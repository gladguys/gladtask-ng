import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgSelectModule } from "@ng-select/ng-select";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { SignupComponent } from "./signup.component";
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../../core/core.module";

@NgModule({
	declarations: [SignupComponent],
	imports: [
		NgSelectModule,
		FlexLayoutModule,
		FontAwesomeModule,
		SharedModule,
		CoreModule
	]
})
export class SignupModule {

	constructor() {
		library.add(faCheck, faEye, faEyeSlash);
	}
}