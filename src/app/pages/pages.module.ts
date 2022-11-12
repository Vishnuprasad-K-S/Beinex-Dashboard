import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '../layout/layout.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartModule } from 'primeng-lts/chart';
import { NotFoundComponent } from './not-found/not-found.component'


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    BarChartComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    ChartModule
  ]
})
export class PagesModule { }
