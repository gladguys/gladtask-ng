import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
	faBars, faCircle, faCheck, faExpand, faInfo, faPaperclip,
	faPause, faPlay, faPlus, faThLarge
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { GTDatatableModule } from 'src/app/shared/components/gt-datatable/gt-datatable.module';
import { GTFormsModule } from 'src/app/shared/components/gt-forms/gt-forms.module';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { GTNotificationModule } from '../../shared/components/gt-notification/gt-notification.module';
import { TeamRoutingModule } from './team-routing.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TeamListSidenavComponent } from './team-list-sidenav/team-list-sidenav.component';

@NgModule({
	declarations: [
		TeamFormComponent,
		TeamDetailComponent,
		TeamListSidenavComponent
	],
	imports: [
		TeamRoutingModule,
		FlexLayoutModule,
		GTDatatableModule,
		GTFormsModule,
		FontAwesomeModule,
		NgSelectModule,
		CoreModule,
		SharedModule,
		GTNotificationModule
	],
	exports: [TeamListSidenavComponent]
})
export class TeamModule {
	constructor() {
		library.add(faBars, faCircle, faCheck, faExpand, faInfo, faPaperclip, faPause, faPlay, faPlus, faThLarge);
	}
}
