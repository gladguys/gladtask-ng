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
			case getStatusFromEnum(Status.CRIADA) : return "grey";
			case getStatusFromEnum(Status.CONCLUIDA) : return "blue";
			case getStatusFromEnum(Status.EM_ESPERA): return "yellow";
			case getStatusFromEnum(Status.EM_ANDAMENTO): return "green";
		}
	}
}
