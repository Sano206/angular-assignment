import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { tableSettings, PersonDetails, SearchParams, PagedResponse } from '../types/person-details';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewPersonComponent } from '../add-new-person/add-new-person.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent extends CommonComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'username', 'email']
  fieldsSettings = tableSettings;
  dataLength: number;
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  totalElementsSearched = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private commonService: CommonService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.handleData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewPersonComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleData();
      }
    });
  }

  prepareSearch(): SearchParams {
    const params = new SearchParams;
    params.pageIndex = this.pageIndex;
    params.pageSize = this.pageSize;
    return params
  }


  handleData(): void {
    const params = this.prepareSearch()
    this.commonService.getData(params).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    )
  }

  page(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleData();
  }

  openDetail(row: PersonDetails): void {
    this.router.navigate(['details', row.id]);
  }

  override handleResponse(response: PagedResponse): void {

    this.dataLength = response.totalElements;
    this.dataSource.data = response.personList;
  }

}
