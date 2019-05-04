import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { GTNotification, GTNotificationType } from "./gt-notification";

@Injectable({
  providedIn: 'root'
})
export class GTNotificationService {

	notificationSubject: Subject<GTNotification> = new Subject<GTNotification>();

	private notificate(notificationType: GTNotificationType, message: string) {
		this.notificationSubject.next(new GTNotification(notificationType, message));
	}

	notificateSuccess(message: string) {
		this.notificate(GTNotificationType.SUCCESS, message);
	}
	
	notificateFailure(message: string) {
		this.notificate(GTNotificationType.FAILURE, message);
	}
	
	notificateInfo(message: string) {
		this.notificate(GTNotificationType.INFO, message);
	}

	notificateWarning(message: string) {
		this.notificate(GTNotificationType.WARNING, message);
	}

	getNotification() {
		return this.notificationSubject.asObservable();
	}
}
