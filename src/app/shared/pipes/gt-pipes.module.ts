import { NgModule } from "@angular/core";

import { DateProximityPipe } from "./date-proximity.pipe";
import { GroupByPipe } from "./group-by.pipe";
import { StatusColorPipe } from "./status-color.pipe";
import {DatePipe} from "@angular/common";
import {MakeTrustedImage} from "./make-trusted-image.pipe";

@NgModule({
	declarations: [
		DateProximityPipe,
		GroupByPipe,
		StatusColorPipe,
		MakeTrustedImage
	],
	exports: [
		DateProximityPipe,
		GroupByPipe,
		StatusColorPipe,
		MakeTrustedImage
	],
	providers: [
		DatePipe,
		DateProximityPipe,
		MakeTrustedImage
	]
})
export class GTPipesModule {

}
