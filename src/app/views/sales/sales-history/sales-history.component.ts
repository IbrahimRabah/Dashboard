import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service';
import { SalesHistoryResponse, SalesItem } from 'src/app/core/models/Sales.model';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  salesHistory!: SalesItem[]
  SalesMan: String = "";
  SalesId: string = "";
  StartDate: Date = new Date();
  EndDate: Date = new Date();
  Page: number = 1
  PageSize: number = 10
  IsSortingAscending!: boolean
  Take!: number
  Skip!: number
  OrderByDirection!: string

  constructor(private salesService: SalesService) { }
  ngOnInit(): void {
    this.getSalesHistory();
  }

  
  getSalesHistory() {
    const queryURL = `?SalesMan=${this.SalesMan}&SalesId${this.SalesId}&StartDate${this.StartDate}&EndDate${this.EndDate}&Page${this.Page}&PageSize${this.PageSize}&IsSortingAscending${this.IsSortingAscending}&Take${this.Take}&Skip${this.Skip}&OrderByDirection${this.OrderByDirection}`;
    this.salesService.getSalesDayBy(queryURL).subscribe({
      next: (response: SalesHistoryResponse) => {
        this.salesHistory = response.data.items;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
