import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean = false;

  constructor(private commonService: CommonService) {
    commonService.itemValue.subscribe((nextValue) => {
      this.loggedIn = nextValue;
    })
  }


  logout() {
    this.commonService.logout();
  }

  title = 'angular-assignment';
}
