import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'gt-datatable',
  templateUrl: './gt-datatable.component.html',
  styleUrls: ['./gt-datatable.component.scss'],
})
export class GTDatatableComponent implements OnChanges {
  @Input() data = [];
  @Input() displayedColumns = [];
  @Input() columnDefinitions = [];

  @Output() public onRowClick: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (obj, property) =>
      this.getProperty(obj, property);
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Qtd.:';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getProperty = (obj, path) => path.split('.').reduce((o, p) => o && o[p], obj);

  onClick(row): void {
    this.onRowClick.emit(row);
  }
}
