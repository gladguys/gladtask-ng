import { Component, Input } from '@angular/core';

import { GTNotificationService } from "./gt-notification.service";
import { GTNotification, GTNotificationType } from "./gt-notification";

@Component({
  selector: 'gt-notification',
  templateUrl: './gt-notification.component.html',
  styleUrls: ['./gt-notification.component.css']
})
export class GTNotificationComponent {

	@Input() timeout = 5000;
	notifications: GTNotification[] = [];

    constructor(private notificationService: GTNotificationService) {
		this.notificationService.getNotification()
			.subscribe(notification => {
				if (!notification) {
					this.notifications = [];
					return;
				}
				this.notifications.push(notification);
				setTimeout(() => this.popNotification(notification), this.timeout);
			})
    }

	private popNotification(notification: GTNotification) {
		this.notifications = this.notifications.filter(n => n != notification);
	}
	
	getNotificationClass(notificationType: GTNotificationType) {
		switch (notificationType) {
			case GTNotificationType.SUCCESS: return 'success';
			case GTNotificationType.FAILURE: return 'failure';
			case GTNotificationType.WARNING: return 'warning';
			case GTNotificationType.INFO: return 'info';
		}
	}
}
