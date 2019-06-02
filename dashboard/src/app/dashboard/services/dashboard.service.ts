import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    protected http: HttpClient,
  ) { }

  private readonly ENDPOINT = 'https://us-central1-dashboard-d8e03.cloudfunctions.net/app/counter';

  getCounter(): Observable<any> {
    return this.http.get<any>(this.ENDPOINT);
  }

  incrementCounter(): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, {});
  }

}
