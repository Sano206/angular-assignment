import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { MyTableComponent } from './my-table/my-table.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data:{requiresLogin: false},
    canActivate: [ LoginGuard ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MyTableComponent,
    data:{requiresLogin: true},
    canActivate: [ LoginGuard ]
  },
  {
    path: 'details/:id',
    component: PersonDetailsComponent,
    data:{requiresLogin: true},
    canActivate: [ LoginGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
