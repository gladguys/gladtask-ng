export class GTNotification {

	constructor(
		public readonly notificationType: GTNotificationType,
		public readonly message: string) {}
}

export enum GTNotificationType {

	SUCCESS,
	FAILURE,
	WARNING,
	INFO
}
