import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgGridModule } from 'ag-grid-angular';
import { NgxSpinnerModule } from "ngx-spinner";

import { GTToolbarModule } from "./components/gt-toolbar/gt-toolbar.module";
import { LoggedOnlyDirective } from "./directives/logged-only.directive";
import { AdminOnlyDirective } from "./directives/admin-only.directive";
import { MaterialModule } from "./components/material/material.module";
import { GTFormsModule } from "./components/gt-forms/gt-forms.module";
import { GTDatatableModule } from "./components/gt-datatable/gt-datatable.module";
import { GTPipesModule } from "./pipes/gt-pipes.module";
import { ToastrModule } from "ngx-toastr";

@NgModule({
	declarations: [
		AdminOnlyDirective,
		LoggedOnlyDirective
	],
	imports: [
		CommonModule,
		GTToolbarModule,
		GTFormsModule,
		GTDatatableModule,
		GTPipesModule,
		AgGridModule.withComponents([]),
		FormsModule,
		MaterialModule,
		HttpClientModule,
		NgxSpinnerModule,
		ToastrModule.forRoot(),
		ReactiveFormsModule
	],
	exports: [
		CommonModule,
		GTToolbarModule,
		GTFormsModule,
		GTDatatableModule,
		GTPipesModule,
		AgGridModule,
		FormsModule,
		MaterialModule,
		HttpClientModule,
		NgxSpinnerModule,
		ReactiveFormsModule,
		AdminOnlyDirective,
		LoggedOnlyDirective
	]
})
export class SharedModule { }
