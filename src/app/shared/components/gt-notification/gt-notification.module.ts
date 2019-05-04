import { NgModule } from "@angular/core";

import { GTNotificationService } from "./gt-notification.service";
import { GTNotificationComponent } from "./gt-notification.component";
import {CommonModule} from "@angular/common";

@NgModule({
	imports: [CommonModule],
	exports: [GTNotificationComponent],
	declarations: [GTNotificationComponent],
	providers: [GTNotificationService]
})
export class GTNotificationModule {
}
