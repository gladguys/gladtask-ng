import { NgModule } from "@angular/core";
import { DatePipe } from "@angular/common";

import { DateProximityPipe } from "./date-proximity.pipe";
import { GroupByPipe } from "./group-by.pipe";
import { StatusColorPipe } from "./status-color.pipe";
import { MakeTrustedImage } from "./make-trusted-image.pipe";
import { HourMinutePipe } from "./hour-minute.pipe";
import { TruncEllipsesTextPipe } from './trunc-ellipses-text.pipe';

@NgModule({
	declarations: [
		DateProximityPipe,
		HourMinutePipe,
		GroupByPipe,
		StatusColorPipe,
		MakeTrustedImage,
		TruncEllipsesTextPipe
	],
	exports: [
		DateProximityPipe,
		HourMinutePipe,
		GroupByPipe,
		StatusColorPipe,
		MakeTrustedImage,
		TruncEllipsesTextPipe
	],
	providers: [
		DatePipe,
		DateProximityPipe,
		MakeTrustedImage
	]
})
export class GTPipesModule {

}
