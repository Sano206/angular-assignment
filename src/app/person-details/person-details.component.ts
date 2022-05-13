import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { CommonService } from '../services/common.service';
import { fieldsSettings, PersonDetails } from '../types/person-details';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent extends CommonComponent implements OnInit {
  fieldsSettings = fieldsSettings;
  data: PersonDetails;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['action'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    public snackbar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.evaluateParams(params);
    })
    this.fieldsSettings.map(setting => {
      this.displayedColumns.push(setting.id);
    })
  }

  evaluateParams(params: Params): void {
    const id = params['id'];
    if (id !== null) {
      this.commonService.getDetails(id).subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error)
      )
    }
  }

  override handleResponse(response: PersonDetails): void {
    const temp = Array<PersonDetails>();
    temp.push(response);
    this.dataSource.data = temp;
    this.data = response;
  }

  delete(): void {
    this.commonService.delete(this.data.id).subscribe(
      response => this.handleDeleteResponse(),
      error => this.handleError(error)
    )
  }

  handleDeleteResponse(): void {
    this.snackbar.open("Person deleted successfully!", 'close', {
      duration: 3000
    });

    this.router.navigate(['home']);
  }
}

