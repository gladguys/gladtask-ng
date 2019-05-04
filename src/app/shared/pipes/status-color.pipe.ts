import {Pipe, PipeTransform} from "@angular/core";
import { Status } from '../enums/status.enum';

@Pipe({
	name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {

	transform(value: string): string {
		return this.getStatusColor(value);
	}

	getStatusColor(status: string): string {
		switch (status) {
			case Status.CRIADA : return "grey";
			case Status.CONCLUIDA : return "green";
			case Status.EM_ESPERA: return "yellow";
			case Status.EM_ANDAMENTO: return "blue";
		}
	}
}
