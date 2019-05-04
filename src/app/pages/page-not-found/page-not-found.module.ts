import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";

import { PageNotFoundComponent } from './page-not-found.component';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	declarations: [PageNotFoundComponent],
	imports: [
		RouterModule,
		FlexLayoutModule,
		CoreModule,
		SharedModule
	],
	exports: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
