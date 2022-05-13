import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent {

  constructor() { }

  handleError(response: HttpErrorResponse): void {
    console.log(response)
  }

  handleResponse(response: any): void {
    console.log(response)
  }
}
