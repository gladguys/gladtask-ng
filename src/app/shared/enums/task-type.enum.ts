export enum TaskType {
	DOCUMENTACAO = "Documentação",
	FEATURE = "Feature",
	BUG = "Bug",
	MELHORIA = "Melhoria",
	TESTE = "Teste",
	ALINHAMENTO = "Alinhamento",
	REUNIAO = "Reunião",
	OUTRO = "Outro"
}

export function possibleTaskTypes(): Array<TaskType> {
	return [TaskType.DOCUMENTACAO,
			TaskType.ALINHAMENTO,
			TaskType.BUG,
			TaskType.FEATURE,
			TaskType.MELHORIA,
			TaskType.REUNIAO,
			TaskType.TESTE,
			TaskType.OUTRO];
}

export function getTaskTypeDescription(taskType: TaskType): string {
	switch (taskType) {
		case TaskType.TESTE: return "Teste";
		case TaskType.REUNIAO: return "Reunião";
		case TaskType.MELHORIA: return "Melhoria";
		case TaskType.FEATURE: return "Feature";
		case TaskType.BUG: return "Bug";
		case TaskType.ALINHAMENTO: return "Alinhamento";
		case TaskType.DOCUMENTACAO: return "Documentação";
		case TaskType.OUTRO: return "Outro";
	}
}
