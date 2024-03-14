
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.scss']
})
export class SalesHomeComponent implements OnInit {

  salesHome!: FormGroup
  constructor(private formBuilder: FormBuilder, private salesService: SalesService) { }

  ngOnInit(): void {
    this.initializeSalesForm();
  }

  initializeSalesForm(): void {
    this.salesHome = this.formBuilder.group({
      canves: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      second: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      salse: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      follow: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      register: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      deposit: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }
  onSubmit() {
    if (this.salesHome.valid) {
      const salesHomeData = this.salesHome.value;
      this.salesService.addSalesDay(salesHomeData).subscribe({
        next: (res) => { 
          console.log("Done =======>" , res);
        }
      });
    }
  }
}