import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
	name: 'dateProximity'
})
export class DateProximityPipe extends DatePipe implements PipeTransform {
	transform(value: any): any {
		const dayInMilli: number = 86400000;

		let datePipe = new DatePipe('pt-BR');

		let dueDate = new Date(value);
		let dueDateMilli = new Date(datePipe.transform(dueDate, 'yyyy-MM-dd')).getTime() as number;

		let today = new Date();
		let todayDateMilli = new Date(datePipe.transform(today, 'yyyy-MM-dd')).getTime() as number;

		let diffDaysMilli = dueDateMilli - todayDateMilli;

		if (diffDaysMilli < 0) {
			return "Atrasada";
		}

		let diffDays = diffDaysMilli / dayInMilli;

		if (diffDays >= 0) {
			switch (diffDays) {
				case 0: return "Hoje";
				case 1: return "Amanhã";
				default: return datePipe.transform(dueDate, 'dd-MM-yyyy');
			}
		}
		return "";
	}
}
