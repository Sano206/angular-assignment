import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { LoginDetails } from '../types/login-details';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PersonDetails, SearchParams } from '../types/person-details';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  itemValue = new BehaviorSubject(this.isLoggedIn);

  baseUrl = 'http://localhost:8080/';
  placeholderUrl = 'https://jsonplaceholder.typicode.com/posts/'

  constructor(private http: HttpClient, private router: Router) { }

  get isLoggedIn(): boolean {
    if (localStorage.getItem('loggedIn') !== null) return true
    return false
  }

  getData(params: SearchParams): Observable<any> {
    return this.http.get(this.baseUrl + params.pageIndex + '/' + params.pageSize);
  }

  addNewPerson(person: FormData): Observable<any> {
    return this.http.post(this.baseUrl, person)
  }

  sendLoginForm(loginDetails: FormData): Observable<any> {
    return this.http.post(this.baseUrl + 'login', loginDetails)
  }

  getDetails(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id)
  }

  login(): void {
    localStorage.setItem('loggedIn', "true");
    this.itemValue.next(true);
    this.router.navigate(['home']);
  }

  logout(): void {
    localStorage.clear();
    this.itemValue.next(false)
    this.router.navigate(['login'])
  }

}
