import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Task } from "../../shared/models/task.model";

@Injectable({
	providedIn: 'root'
})
export class HomeUpdaterService {
	informHomeUpdate$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);

	getSubscriberHomeUpdate() {
		return this.informHomeUpdate$;
	}

	publishHomeUpdate(task: Task) {
		this.informHomeUpdate$.next(task);
	}
}