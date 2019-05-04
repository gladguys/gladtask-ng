export enum Status {
	CRIADA = "CRIADA",
	EM_ESPERA = "EM_ESPERA",
	EM_ANDAMENTO = "EM_ANDAMENTO",
	CONCLUIDA = "CONCLUIDA"
}

export function getStatus(status: string): Status {
	switch (status) {
		case "Criada": return Status.CRIADA;
		case "Em espera": return Status.EM_ESPERA;
		case "Em andamento": return Status.EM_ANDAMENTO;
		case "Concluída": return Status.CONCLUIDA;
	}
}

export function getStatusFromEnum(status: string): string {
	switch (status) {
		case Status.CRIADA: return "Criada";
		case Status.EM_ESPERA: return "Em espera";
		case Status.EM_ANDAMENTO: return "Em andamento";
		case Status.CONCLUIDA: return "Concluída";
	}
}

export function getPossibleStatus(): Array<Status> {
	return [Status.CRIADA,
			Status.EM_ESPERA,
			Status.EM_ANDAMENTO,
			Status.CONCLUIDA];
}
