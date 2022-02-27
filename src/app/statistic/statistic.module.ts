import { TableCustomerComponent } from './table-customer/table-customer.component';
import { StatisticComponent } from './statistic.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { TableCustomerModule } from './table-customer/table-customer.module';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MaterialExampleModule } from 'src/material.module';



@NgModule({
  declarations: [
    StatisticComponent,
    TableCustomerComponent
  ],
  imports: [
    CommonModule,
    TableCustomerModule,
    StatisticRoutingModule,
    HttpClientModule,
    MatTableModule,
    MaterialExampleModule
  ]
})
export class StatisticModule { }
