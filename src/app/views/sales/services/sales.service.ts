import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  baseUrl = environment.baseUrl;
  currentUrl = "SalesDay";
  constructor(private httpClient: HttpClient) { }

  getSalesDayBy(): Observable<any> {

    return this.httpClient.get(`${this.baseUrl + this.currentUrl}`);
  }
  addSalesDay(salesDay: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl + this.currentUrl}`, salesDay);
  }

  getSalesDayById(salesDayId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/${salesDayId}`);
  }
  updateSalesDay(salesDayId: number, salesDay: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl}/${salesDayId}`, salesDay);
  }
}
