import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    NotfoundComponent
  ]
})
export class SharedModule { }
