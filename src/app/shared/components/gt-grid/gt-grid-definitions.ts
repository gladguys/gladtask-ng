export const localeText: any = {
	contains: 'Contém',
	notContains: 'Não Contém',
	startsWith: 'Começa com',
	endsWith: 'Termina com',
	equals: 'Igual a',
	notEqual: 'Diferente de',
	andCondition: 'E',
	orCondition: 'Ou',
	to: 'a',
	of: 'de',
	page: 'Página',
	noRowsToShow: 'Nenhum registro encontrado'
};

export const columnTaskDefinitions = [
	{ headerName: 'Número', field: 'number', sortable: true, filter: true},
	{ headerName: 'Projeto', field: 'project.name', sortable: true, filter: true},
	{ headerName: 'Título', field: 'title', sortable: true, filter: true},
	{ headerName: 'Tipo', field: 'taskType', sortable: true, filter: true},
	{ headerName: 'Situação', field: 'status', sortable: true, filter: true},
	{ headerName: 'Prioridade', field: 'priority', sortable: true, filter: true},
	{ headerName: 'Criado por', field: 'creatorUser.username', sortable: true, filter: true}
];
