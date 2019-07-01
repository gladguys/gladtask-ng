import { TeamModule } from './pages/team/team.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faColumns, faEnvelope, faHome, faPlus, faTasks, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { GTConfirmationDialogComponent } from "./shared/components/gt-confirmation-dialog/gt-confirmation-dialog.component";
import { ProjectFormComponent } from "./pages/project/project-form/project-form.component";

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { GTModule } from './pages/gt.module';
import { GTErrorHandler, rollbarFactory, RollbarService } from "./core/errors-handlers/gt-error-handler";

registerLocaleData(localePt);

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		CommonModule,
		CoreModule,
		SharedModule,
		GTModule,
		FlexLayoutModule,
		FontAwesomeModule,
		AppRoutingModule,
		TeamModule
	],
	providers: [
		{ provide: ErrorHandler, useClass: GTErrorHandler },
		{ provide: RollbarService, useFactory: rollbarFactory }
	],
	entryComponents: [ProjectFormComponent, GTConfirmationDialogComponent],
	bootstrap: [AppComponent]
})
export class AppModule {

	constructor() {
		library.add(faColumns, faEnvelope, faHome, faPlus, faTasks, faThumbtack);
	}
}
