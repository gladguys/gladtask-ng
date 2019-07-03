import { NgModule } from "@angular/core";
import { DatePipe } from "@angular/common";

import { DateProximityPipe } from "./date-proximity.pipe";
import { GroupByPipe } from "./group-by.pipe";
import { StatusColorPipe } from "./status-color.pipe";
import { MakeTrustedImage } from "./make-trusted-image.pipe";
import { HourMinutePipe } from "./hour-minute.pipe";

@NgModule({
	declarations: [
		DateProximityPipe,
		HourMinutePipe,
		GroupByPipe,
		StatusColorPipe,
		MakeTrustedImage
	],
	exports: [
		DateProximityPipe,
		HourMinutePipe,
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
