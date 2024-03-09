import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';


@NgModule({
  declarations: [
    SalesHistoryComponent,
    SalesHomeComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
