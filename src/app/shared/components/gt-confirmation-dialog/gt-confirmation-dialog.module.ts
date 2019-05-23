import {NgModule} from "@angular/core";
import {GTConfirmationDialogComponent} from "./gt-confirmation-dialog.component";
import {MaterialModule} from "../material/material.module";

@NgModule({
	declarations: [GTConfirmationDialogComponent],
	imports: [MaterialModule],
	exports: [GTConfirmationDialogComponent]
})
export class GTConfirmationDialogModule {

}