import {Pipe, PipeTransform} from "@angular/core";
import { Status, getStatusFromEnum } from '../enums/status.enum';

@Pipe({
	name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {

	transform(value: string): string {
		return this.getStatusColor(value);
	}

	getStatusColor(status: string): string {
		switch (status) {
			case "CRIADA" : return "grey";
			case "CONCLUIDA" : return "blue";
			case "EM ESPERA" :  return "yellow";
			case "EM_ESPERA" :  return "yellow";
			case "EM ANDAMENTO": return "green";
			case "EM_ANDAMENTO": return "green";
		}
	}
}
