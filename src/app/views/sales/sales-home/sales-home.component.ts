
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../services/sales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.scss']
})
export class SalesHomeComponent implements OnInit {

  salesHome!: FormGroup
  slaesId: string = "";
  addedDate!: Date
  salesId!: string
  constructor(private formBuilder: FormBuilder, private salesService: SalesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeSalesForm();
    this.routerData();
  }

  initializeSalesForm(): void {
    this.salesHome = this.formBuilder.group({
      canvas: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      secondCall: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      sell: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      follow: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      register: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      deposit: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  routerData() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.slaesId = String(params.get('id'));
      // console.log(this.productId)
      if (this.slaesId !== "null") {
        this.getSalesById(this.slaesId);
      }
    })
  }
  onSubmit() {
    if (this.salesHome.valid) {

      const salesHomeData = this.salesHome.value;
      if (this.slaesId==="null") {
        this.salesService.addSalesDay(salesHomeData).subscribe({
          next: (res) => {
            console.log("Done =======>", res);
          }
        });
      }
      else {
        salesHomeData['salesId'] = this.salesId;
        salesHomeData['date'] = this.addedDate;
        this.salesService.updateSalesDay(this.slaesId, salesHomeData).subscribe({
          next: (res) => {
            console.log(res);
          }
        })
      }
    }
  }
  getSalesById(salesId: string) {
    this.salesService.getSalesDayById(this.slaesId).subscribe({
      next: (data) => {
        this.addedDate = new Date(data.data.date);
        this.salesId = data.data.salesId;
        this.salesHome.patchValue({
          canvas: data.data.canvas,
          secondCall: data.data.secondCall,
          sell: data.data.sell,
          follow: data.data.follow,
          register: data.data.register,
          deposit: data.data.deposit,
        })
      }
    })
  }
}