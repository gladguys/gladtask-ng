import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { TimeSpent } from "../../../shared/models/time-spent.model";

@Injectable({
	providedIn: 'root'
})
export class TimeSpentService {
	timeSpent$: BehaviorSubject<TimeSpent> = new BehaviorSubject<TimeSpent>(null);

	getTimeSpentSubject(): BehaviorSubject<TimeSpent> {
		return this.timeSpent$;
	}

	emitTimeSpent(timeSpent: TimeSpent) {
		this.timeSpent$.next(timeSpent);
	}
}