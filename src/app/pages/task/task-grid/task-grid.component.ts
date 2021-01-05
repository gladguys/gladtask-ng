import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../shared/models/task.model';
import { Router } from '@angular/router';
import { TaskRoutingNames } from '../task-routing-names';

@Component({
  selector: 'task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.scss'],
})
export class TaskGridComponent implements OnInit {
  @Input('rowData') rowData: Task[];

  gridOptions: any = {};

  localeText: any = {
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
    noRowsToShow: 'Nenhum registro encontrado',
  };

  columnTaskDefinitions = [
    {
      headerName: 'Projeto',
      field: 'project.name',
      sortable: true,
      filter: true,
    },
    { headerName: 'Título', field: 'title', sortable: true, filter: true },
    { headerName: 'Tipo', field: 'taskType', sortable: true, filter: true },
    { headerName: 'Situação', field: 'status', sortable: true, filter: true },
    {
      headerName: 'Prioridade',
      field: 'priority',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Criado por',
      field: 'creatorUser.username',
      sortable: true,
      filter: true,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.configureGridRowStyle();
  }

  configureGridRowStyle(): void {
    this.gridOptions.getRowStyle = (params) => {
      if (params.data.priority === 'Baixo') {
        return null;
      } else if (params.data.priority === 'Normal') {
        return { background: 'rgb(255, 255, 225)' };
      } else {
        return { background: 'rgb(255, 230, 230)' };
      }
    };
  }

  onRowSelected(row): void {
    let task = row.data;
    this.router.navigate([
      TaskRoutingNames.TASKS,
      TaskRoutingNames.TASK_FORM,
      task._id,
    ]);
  }

  onFirstDataRendered(params) {
    this.autoSizeAll();
    params.api.sizeColumnsToFit();
  }

  autoSizeAll() {
    var allColumnIds = [];
    this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
  }
}
