import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { MaterialModule } from "../material/material.module";
import { GTDatatableComponent } from "./gt-datatable.component";

@NgModule({
	declarations: [GTDatatableComponent],
	imports: [
		CommonModule,
		MaterialModule,
		FontAwesomeModule,
		FlexLayoutModule
	],
	exports: [GTDatatableComponent]
})
export class GTDatatableModule {

	constructor() {
		library.add(faSearch);
	}
}
